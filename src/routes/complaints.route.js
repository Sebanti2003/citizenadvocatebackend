import express from "express";
import { getallcomplaints, ministryofrailwaypostcomplaint } from "../controllers/complaints.controller.js";
import { sessionProtected } from "../middlewares/cookieprotected.middleware.js";

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Complaints");
});
router
  .route("/ministryofrailwaypostcomplaint")
  .post(sessionProtected, ministryofrailwaypostcomplaint);
router.route("/getallcomplaints").get(sessionProtected, getallcomplaints);
export default router;
