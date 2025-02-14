import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const ministrySchema = new mongoose.Schema(
  {
    departmentalname: { type: String, required: [true, "Department name is required"] },
    departmentalid: { 
      type: String, 
      required: [true, "Department ID is required"], 
      unique: [true, "Department ID must be unique"] 
    },
    password: { type: String, required: [true, "Password is required"] },
    role: { type: String, default: "ministry" },
  },
  { timestamps: true }
);

// Hash password before saving

const Ministry = mongoose.model("Ministry", ministrySchema);

export default Ministry;
