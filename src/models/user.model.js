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
userschema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = bcrypt.hashSync(user.password, 10);
  }
  next();
});
userschema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
userschema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};
userschema.statics.findByPhoneNumber = function (phonenumber) {
  return this.findOne({ phonenumber });
};

const User = mongoose.model("User", userschema);

export default User;
