import dotenv from "dotenv";
import path from "path";

// Render par variables inject hote hain, 
// lekin agar aapko lag raha hai nahi mil rahe toh ye path fix hai:
dotenv.config(); 

import app from "./src/app.js";
import connectToDB from "./src/config/database.js";

// CRITICAL FIX: Render hamesha port env mein bhejta hai. 
// Use 3000 mat do, 10000 do default mein agar local pe nahi ho.
const PORT = process.env.PORT || 10000; 

connectToDB()
  .then(() => {
    // 0.0.0.0 zaroori hai Render ke liye
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`Check this: process.env.JWT_SECRET is ${process.env.JWT_SECRET ? 'Defined' : 'UNDEFINED'}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  });
