import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Blacklist from "../models/blacklist.model.js";

export const authUser = async (req, res, next) => {
  try {
   
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No token",
      });
    }

    
    const isBlacklisted = await Blacklist.findOne({ token });

    if (isBlacklisted) {
      return res.status(401).json({
        success: false,
        message: "Token expired / blacklisted",
      });
    }

   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    
    req.user = user;

    next();

  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
