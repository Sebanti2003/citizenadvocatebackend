import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userschema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      index: true,
      unique: [true, "Email must be unique"],
    },
    password: { type: String, required: [true, "Password is required"] },
    state: { type: String, required: [true, "State is required"] },
    role: { type: String, default: "user" },
    phonenumber: {
      type: String,
      required: [true, "Phone number is required"],
      unique: [true, "Phone number must be unique"],
      match: [/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userschema);

export default User;
