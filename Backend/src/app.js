import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// This is the new, more flexible CORS configuration

app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true); // Allow requests with no origin (like mobile apps or curl requests)

      // Allow if the origin is a vercel.app subdomain or one of the local dev environments
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

/* using all the routes here */
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;
