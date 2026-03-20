import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const allowedOrigins = new Set([
 "https://interview-ai-eight-tau.vercel.app",
]);

app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true);
      if (allowedOrigins.has(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
    optionsSuccessStatus: 204,
  }),
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
