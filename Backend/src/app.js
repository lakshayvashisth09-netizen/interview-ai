import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import interviewRouter from "./routes/interview.routes.js";

const app = express();

// 1. Health check (Sabse upar taaki deployment verify ho sake)
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// 2. CORS Middleware
const allowedOrigins = [
  "https://interview-ai-eight-tau.vercel.app",
  "http://localhost:5173",
  "http://127.0.0.1:5173"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin
      if (!origin) return callback(null, true);
      
      const isAllowed = allowedOrigins.includes(origin) || origin.endsWith(".vercel.app");
      
      if (isAllowed) {
        callback(null, true);
      } else {
        console.log("CORS Blocked for origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
  })
);

/** * CRITICAL FIX: 
 * Purane versions mein app.options("*") chalta tha, 
 * lekin Express ke naye path-to-regexp version mein ye crash karta hai.
 * Isliye hum manually OPTIONS handle kar rahe hain jo hamesha chalega.
 */
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    return res.sendStatus(200);
  }
  next();
});

// 3. Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 4. Routes
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

export default app;
