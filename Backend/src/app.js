import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// --- These lines were restored ---
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data
app.use(cookieParser()); // Parses cookies
// --------------------------------

// This is the flexible CORS configuration
app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true);
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
  })
);

/* require all the routes here */
import authRouter from "./routes/auth.routes.js";
import interviewRouter from "./routes/interview.routes.js";

/* --- And these route handlers were restored --- */
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);
// ---------------------------------------------

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;