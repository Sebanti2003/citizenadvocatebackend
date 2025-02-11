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
ministrySchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

// Compare password method
ministrySchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// Static methods to find by ID or department name
ministrySchema.statics.findByDepartmentalId = function (departmentalid) {
  return this.findOne({ departmentalid });
};

ministrySchema.statics.findByDepartmentalName = function (departmentalname) {
  return this.findOne({ departmentalname });
};

const Ministry = mongoose.model("Ministry", ministrySchema);

export default Ministry;
