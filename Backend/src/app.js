import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import interviewRouter from "./routes/interview.routes.js";

const app = express();

// ✅ FIXED CORS (IMPORTANT)
app.use(cors({
  origin: [
    "https://interview-ai-eight-tau.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true,
}));

// ✅ Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

export default app;
