import { configDotenv } from "dotenv";
import Ministry from "../models/ministry.model";
configDotenv();
export const getministryinfo = async (req, res) => {
  try {
    const ministry = req.ministry;
    const ministrynew = await Ministry.findById(ministry._id);
    if (!ministrynew) {
      return res
        .status(404)
        .json({ message: "Ministry not found", success: false });
    }
    return res.status(200).json({
      message: "Ministry info fetched successfully",
      success: true,
      user: ministrynew,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error in getministryinfo",
      success: false,
      error: error.message,
    });
  }
};
