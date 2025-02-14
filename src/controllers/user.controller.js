import { configDotenv } from "dotenv";
import User from "../models/user.model.js";
configDotenv();
export const getuserinfo = async (req, res) => {
  try {
    const user = req.user;
    const usernew = await User.findById(user.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    return res.status(200).json({
      message: "User info fetched successfully",
      success: true,
      user: usernew,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error in getuserinfo",
      success: false,
      error: error.message,
    });
  }
};
