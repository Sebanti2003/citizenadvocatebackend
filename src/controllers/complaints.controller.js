import Complaint from "../models/complaint.model.js";

export const ministryofrailwaypostcomplaint = async (req, res) => {
  try {
    const person = req.user.id;
    const {
      ministry = "67b0a0b2a3336b7a7862190b",
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
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    res.status(500).json({
      message: "Error creating complaint realted to railway, try again later",
    });
  }
};
export const ministryofConsumerAffairspostcomplaint = async (req, res) => {
  try {
    const person = req.user.id;
    const {
      ministry = "67b0a0f7a3336b7a7862190d",
      productid,
      productname,
      date,
      description,
      category,
      document,
    } = req.body;
    if (
      !person ||
      !ministry ||
      !productid ||
      !productname ||
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
      productid,
      productname,
      date,
      category,
      description,
      document,
    });
    res.status(201).json({
      message: " Consumer Affairs Complaint created successfully",
      complaint: newcomplaint,
    });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    res.status(500).json({
      message:
        "Error creating complaint realted to consumer affairs, try again later",
    });
  }
};
export const ministryofeducationpostcomplaint = async (req, res) => {
  try {
    const person = req.user.id;
    const {
      ministry = "67b0abda60df40a5a07df32f",
      institutionid,
      institutionname,
      date,
      description,
      category,
      document,
    } = req.body;
    if (
      !person ||
      !ministry ||
      !institutionid ||
      !institutionname ||
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
      institutionid,
      institutionname,
      date,
      category,
      description,
      document,
    });
    res.status(201).json({
      message: " Education Complaint created successfully",
      complaint: newcomplaint,
    });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    res.status(500).json({
      message: "Error creating complaint realted to education, try again later",
    });
  }
};
export const ministryofroadtransportandhighwayspostcomplaint = async (req, res) => {
  try {
    const person = req.user.id;
    const {
      ministry = "67b0a135a3336b7a78621913",
      transportservicenumber,
      transportservicename,
      date,
      description,
      category,
      document,
    } = req.body;
    if (
      !person ||
      !transportservicenumber ||
      !transportservicename ||
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
      transportservicenumber,
      transportservicename,
      date,
      category,
      description,
      document,
    });
    res.status(201).json({
      message: " Road Transport Complaint created successfully",
      complaint: newcomplaint,
    });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    res.status(500).json({
      message:
        "Error creating complaint realted to  road transport, try again later",
    });
  }
};
export const ministryofHealthFamilyWelfarepostcomplaint = async (req, res) => {
  try {
    const person = req.user.id;
    const {
      ministry = "67b0a143a3336b7a78621915",
      hospitalid,
      hospitalname,
      date,
      description,
      category,
      document,
    } = req.body;
    if (
      !person ||
      !ministry ||
      !hospitalid ||
      !hospitalname ||
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
      hospitalid,
      hospitalname,
      date,
      category,
      description,
      document,
    });
    res.status(201).json({
      message: " Health Complaint created successfully",
      complaint: newcomplaint,
    });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    res.status(500).json({
      message: "Error creating complaint realted to health, try again later",
    });
  }
};
export const ministryofWomenandChildrenDevelopmentpostcomplaint = async (
  req,
  res
) => {
  try {
    const person = req.user.id;
    const {
      ministry = "67b0a121a3336b7a78621911",
      issuecode,
      issuetype,
      date,
      description,
      category,
      document,
    } = req.body;
    if (
      !person ||
      !ministry ||
      !issuecode ||
      !issuetype ||
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
     issuecode,
     issuetype,
      date,
      category,
      description,
      document,
    });
    res.status(201).json({
      message: " Women and Children Complaint created successfully",
      complaint: newcomplaint,
    });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    res.status(500).json({
      message: "Error creating complaint realted to women and children, try again later",
    });
  }
};

export const getallcomplaints = async (req, res) => {
  try {
    const allcomplaints = await Complaint.find({})
      .sort({ createdAt: -1 })
      .populate("person ministry");
    res.status(200).json(allcomplaints);
  } catch (error) {
    res.status(500).json({ message: "Error fetching complaints" });
  }
};
