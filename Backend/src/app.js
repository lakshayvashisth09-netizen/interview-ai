import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import interviewRouter from "./routes/interview.routes.js";

const app = express();

// 1. CORS Middleware (Improved)
const allowedOrigins = [
  "https://interview-ai-eight-tau.vercel.app",
  "http://localhost:5173",
  "http://127.0.0.1:5173"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      
      const isAllowed = allowedOrigins.includes(origin) || origin.endsWith(".vercel.app");
      
      if (isAllowed) {
        callback(null, true);
      } else {
        console.log("CORS Blocked for origin:", origin); // Debugging ke liye
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
  })
);

// Preflight requests (OPTIONS) ko handle karne ke liye
app.options("*", cors());

// 2. Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 3. Routes
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

// 4. Health check (Iska URL ab browser mein check karna)
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;
