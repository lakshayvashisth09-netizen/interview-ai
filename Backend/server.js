import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import connectToDB from "./src/config/database.js";

const PORT = process.env.PORT || 3000;

connectToDB()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  });
