import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import interviewRouter from "./routes/interview.routes.js";

const app = express();

// 1. Manual CORS handling (Isse cors() library ki zaroorat nahi padegi)
app.use((req, res, next) => {
  const allowedOrigins = [
    "https://interview-ai-eight-tau.vercel.app",
    "http://localhost:5173",
    "http://127.0.0.1:5173"
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin) || (origin && origin.endsWith(".vercel.app"))) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // OPTIONS request ko turant handle karein (Preflight fix)
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// 2. Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// 3. Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 4. Routes
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

export default app;
