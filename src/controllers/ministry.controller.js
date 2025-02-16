import { configDotenv } from "dotenv";
import Ministry from "../models/ministry.model.js";
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
export const getallministries = async (req, res) => {
  try {
    const ministries = await Ministry.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      message: "Ministries fetched successfully",
      numberofministries: ministries.length,
      ministries,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching ministries" });
  }
};
export const deleteministry = async (req, res) => {
  try {
    const ministry = req.ministry;
    const deletedministry = await Ministry.findByIdAndDelete(ministry._id);
    if (!deletedministry) {
      return res
        .status(404)
        .json({ message: "Ministry not found", success: false });
    }
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ message: "Error logging out" });
      res.clearCookie("connect.sid");
      res.json({ message: "Ministry deleted successfully", success: true });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error in deleteministry",
      success: false,
      error: error.message,
    });
  }
};
