import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import interviewRouter from "./routes/interview.routes.js";

const app = express();

// 1. CORS Middleware
app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true); // Allow requests with no origin
      const allowed =
        origin.endsWith(".vercel.app") ||
        origin.startsWith("http://localhost:") ||
        origin.startsWith("http://127.0.0.1:");
      if (allowed) {
        return cb(null, true);
      } else {
        return cb(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// 2. Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 3. Routes
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

// 4. Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;
