import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  dotenv.config({ path: "./src/.env" });
}

import app from "./src/app.js";
import connectToDB from "./src/config/database.js";

// Database connect hone ke baad hi server start karein (Best practice)
connectToDB().then(() => {
  // 1. Render dynamic port deta hai, isliye process.env.PORT use karna MUST hai
  const PORT = process.env.PORT || 3000;

  // 2. '0.0.0.0' par listen karna zaroori hai taaki external requests accept hon
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error("Database connection failed:", err);
});
