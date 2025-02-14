import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    //i want to set the type to model User
    person: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ministry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ministry",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "resolved", "rejected"],
      default: "pending",
    },
    category: {
      type: String,
      required: true,
    },
    trainNumber: {
      type: String,
    },
    trainName: {
      type: String,
    },
    pnr: {
      type: String,
    },
    date: {
      type: Date,
    },
    description: {
      type: String,
    },
    document: {
      type: String,
    },
  },
  { timestamps: true }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;
