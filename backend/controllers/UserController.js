import userModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
import OTPModel from "../models/OTPModel.js";
import { generateOTP } from "../utils/generateOTP.js";
import { sendEmail } from "../utils/sendEmail.js";
import {
  EmailOTP,
  EmailWelcome,
  ResendEmail,
  VerifiedEmail,
} from "../utils/EmailTemplates.js";

// Create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.json({
        success: false,
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, and a special character.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      verified: false,
    });

    const user = await newUser.save();

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    try {
      await sendEmail(
        user.email,
        "Email Verification 🌷",
        EmailOTP(user.name, otp)
      );
      await OTPModel.create({ userId: user._id, otp, expiresAt });
      res.json({
        success: true,
        message: "OTP sent to your email",
        redirect: "/verify-otp",
        userId: user._id,
      });
    } catch (error) {
      console.error("Error sending email:", error);
      await userModel.findByIdAndDelete(user._id);
      return res.json({ success: false, message: "Failed to send email" });
    }
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Network Unstable" });
  }
};

// Verify OTP
const verifyOTP = async (req, res) => {
  const { userId, otp, token } = req.body;
  try {
    let user;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      user = await userModel.findById(decoded.id);
    } else {
      user = await userModel.findById(userId);
    }

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check OTP validity
    const otpRecord = await OTPModel.findOne({ userId });
    
    if (!otpRecord || otpRecord.otp !== otp || new Date() > otpRecord.expiresAt) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    // Mark user as verified
    user.verified = true;
    await user.save();
    await OTPModel.deleteOne({ userId });

    await sendEmail(user.email, "Successful Verification 🌷", VerifiedEmail(user.name));
    const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
    const redirectUrl = `${FRONTEND_URL}/?name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}`;
    
    return res.json({
      success: true,
      message: "Email verified successfully",
      redirect: redirectUrl,
      token: createToken(user._id),
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ success: false, message: "Network Unstable" });
  }
};

// Resend OTP
const resendOTP = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.verified) {
      return res.json({ success: false, message: "User already verified" });
    }

    const otp = generateOTP();
    const token = createToken(user._id);
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-otp?token=${token}`;
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

    await sendEmail(
      user.email,
      "Email Verification 🌷",
      ResendEmail(user.name, otp, verificationUrl)
    );
    await OTPModel.updateOne({ userId: user._id }, { otp, expiresAt }, { upsert: true });

    res.json({ success: true, message: "OTP resent successfully" });
  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({ success: false, message: "Network Unstable" });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email. \n Please register first.",
      });
    }

    if (!user.verified) {
      return res.json({
        success: false,
        message: "Please verify your email to continue.",
        redirect: "/verify-otp",
      });
    }

    if (!user.password) {
      return res.json({
        success: false,
        message: "This account was created using Google. Please use Google login.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = createToken(user._id);
    await sendEmail(email, "Welcome Back 🌷", EmailWelcome(user.name));

    res.json({
      success: true,
      token,
      message: "Login Successful!",
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

// Google Auth Callback
const googleAuthCallback = async (req, res) => {
  try {
    console.log("Google Profile Data:", req.user);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Google authentication failed",
      });
    }

    const { id: googleId, displayName, emails, photos } = req.user;
    const email = emails?.[0]?.value || null;
    const name = displayName || "Google User";
    const avatar = photos?.[0]?.value || "";

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Required user information (email) is missing",
      });
    }

    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({
        name,
        email,
        avatar,
        googleId,
        verified: true,
      });
    }

    const token = createToken(user._id);
    await sendEmail(email, "Welcome Back 🌷", EmailWelcome(user.name));

    const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";

    res.redirect(
      `${frontendURL}/?token=${token}&name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}&avatar=${encodeURIComponent(avatar)}`
    );
  } catch (error) {
    console.error("Error during Google authentication:", error.message);
    const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";
    res.redirect(`${frontendURL}/?error=google_auth_failed`);
  }
};

// Google login failure
const googleAuthFailure = (req, res) => {
  const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";
  console.error("Google authentication failed:", req.query.error);
  res.redirect(`${frontendURL}/?error=google_auth_failed`);
};

export { registerUser, verifyOTP, resendOTP, loginUser, googleAuthCallback, googleAuthFailure };
