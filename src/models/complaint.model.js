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
    //railway
    trainNumber: {
      type: String,
    },
    trainName: {
      type: String,
    },
    pnr: {
      type: String,
    },
    //education
    institutionid: {
      type: String,
    },
    intitutionname: {
      type: String,
    },
    //road transport and highways
    transportservicenumber: {
      type: String,
    },
    transportservicename: {
      type: String,
    },
    //consumer affairs
    productid: {
      type: String,
    },
    productname: {
      type: String,
    },
    //health and family welfare
    hospitalid: {
      type: String,
    },
    hospitalname: {
      type: String,
    },
    //women and children development
    issuecode: {
      type: String,
    },
    issuetype: {
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
