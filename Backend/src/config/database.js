import mongoose from "mongoose";

async function connectToDB() {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!uri || typeof uri !== "string" || uri.trim() === "") {
      console.warn(
        "MONGO_URI/MONGODB_URI not set; skipping database connection",
      );
      return;
    }
    await mongoose.connect(uri);

    console.log("Connected to Database");
  } catch (err) {
    console.log(err);
  }
}

export default connectToDB;
