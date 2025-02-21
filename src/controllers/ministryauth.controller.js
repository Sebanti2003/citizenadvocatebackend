import bcrypt from "bcryptjs";
import Ministry from "../models/ministry.model.js";
import { configDotenv } from "dotenv";
configDotenv();
export const signup = async (req, res) => {
  try {
    const { departmentalname, departmentalid, password } = req.body;
    console.log('====================================');
    console.log(departmentalname, departmentalid, password);
    console.log('====================================');
    if (!departmentalname) {
      return res.status(400).json({ message: "Departmental name is required" });
    }
    if (!departmentalid) {
      return res.status(400).json({ message: "Departmental ID is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const existingMinistry = await Ministry.findOne({ departmentalid });
    if (existingMinistry) {
      return res.status(200).json({ message: "Ministry already exists",success:true });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newministry = await Ministry.create({
      departmentalname,
      departmentalid,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Ministry created successfully",
      ministrymessage: `Ministry ${newministry.departmentalname} created successfully`,
      newministry,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { departmentalid, password } = req.body;

    if (!departmentalid) {
      return res.status(400).json({ message: "Departmental ID is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const ministry = await Ministry.findOne({ departmentalid });
    if (!ministry) {
      return res.status(404).json({ message: "Ministry not found" });
    }

    const isValidPassword = await bcrypt.compare(password, ministry.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    req.session.ministry = ministry;

    return res.status(200).json({
      message: "Ministry login successful",
      ministrymessage: `Ministry ${ministry.departmentalname} logged in successfully`,
      ministry,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ message: "Error logging out" });
      res.clearCookie("connect.sid");
      res.json({ message: "Logout successful" });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error in logout",
      success: false,
    });
  }
};
