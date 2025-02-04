import mongoose from "mongoose";

// Define User Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String },
    avatar: { type: String},
    cartData: { type: Object, default: {} },
    googleId: { type: String, unique: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Add Index for Optimized Search
userSchema.index();

const userModel = mongoose.models.user || mongoose.model("User", userSchema);
export default userModel;
