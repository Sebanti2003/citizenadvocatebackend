import Complaint from "../models/complaint.model.js";

export const ministryofrailwaypostcomplaint = async (req, res) => {
  try {
    const {
      person,
      ministry,
      type,
      trainNumber,
      trainName,
      pnr,
      date,
      description,
      category,
      document,
    } = req.body;
    if (
      !person ||
      !ministry ||
      !type ||
      !trainNumber ||
      !trainName ||
      !pnr ||
      !date ||
      !description ||
      !category ||
      !document
    ) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const newcomplaint = await Complaint.create({
      person,
      ministry,
      type,
      trainNumber,
      trainName,
      pnr,
      date,
      category,
      description,
      document,
    });
    res.status(201).json({
      message: " Railway Complaint created successfully",
      complaint: newcomplaint,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating complaint realted to railway, try again later",
    });
  }
};
export const getallcomplaints = async (req, res) => {
  try {
    const allcomplaints = await Complaint.find({}).sort({ createdAt: -1 });
    res.status(200).json(allcomplaints);
  } catch (error) {
    res.status(500).json({ message: "Error fetching complaints" });
  }
}

