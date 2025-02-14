import { configDotenv } from "dotenv";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
configDotenv();
export const signup = async (req, res) => {
  try {
    const { name, email, password, state, phonenumber } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Please enter your name" });
    }
    if (!email) {
      return res.status(400).json({ error: "Please enter your email" });
    }
    if (!email.includes("@") || !email.includes(".com")) {
      return res.status(400).json({ error: "Please enter a valid email" });
    }
    if (!password) {
      return res.status(400).json({ error: "Please enter your password" });
    }
    if (!state) {
      return res.status(400).json({ error: "Please enter your state" });
    }
    if (!phonenumber) {
      return res.status(400).json({ error: "Please enter your phone number" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ error: "Email already exists" });
    }
    const hashsalt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, hashsalt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      state,
      phonenumber,
    });
    return res.status(200).json({
      message: "User registered successfully",
      success: true,
      usermessage: `Welcome to Citizen Portal ${user.name} `,
      user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Something went wrong", success: false });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "email is required",
        success: false,
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "password is required",
        success: false,
      });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email",
        success: false,
      });
    }
    const isValidPassword = await bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false,
      });
    }
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      state: user.state,
      phonenumber: user.phonenumber,
    };
    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      usermessage: `Welcome to Citizen Portal ${user.name} `,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error in login",
      success: false,
    });
  }
};
export const logout = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ error: "Error logging out" });
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
