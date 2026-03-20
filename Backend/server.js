import dotenv from "dotenv";
dotenv.config();
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  dotenv.config({ path: "./src/.env" });
}
import app from "./src/app.js";
import connectToDB from "./src/config/database.js";

connectToDB();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
