import express from "express";
import corsMiddleware from "./middlewares/cors.js";
import { connectDB } from "./config/Db.js";
import designRouter from "./routes/DesignRoute.js";
import userRouter from "./routes/UserRoute.js";
import limiter from "./middlewares/rateLimiter.js";
import "dotenv/config.js";
import cartRouter from "./routes/CartRoute.js";
import orderRouter from "./routes/OrderRoute.js";
import authMiddleware from "./middlewares/auth.js";
import securityMiddleware from "./middlewares/security.js";
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";
import permissionRouter from "./routes/PermissionRoute.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import "./config/passport.js";
import passport from "passport";
import BotRouter from "./routes/BotRoute.js";

// App config
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(corsMiddleware);
app.options("*", corsMiddleware);

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure cookies in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// DB connection
connectDB();

// API Endpoints
app.use("/api/design", designRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter); // Google authentication handled in userRouter
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/permission", permissionRouter);

// Authenticated Routes
app.use("/api/auth", userRouter);
app.use("/api/chat", BotRouter);

// Protected Routes
app.use("/api/protected", authMiddleware, (req, res) => {
  res.send("Hello, authenticated user!");
});

// Other Middleware and Routes
app.use(securityMiddleware);
app.use(errorHandler);
app.use(limiter);

app.get("/", (req, res) => {
  res.send("API working");
});

app.use((req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`);
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: err.stack || null,
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
