import express from "express";
import {
  getallcomplaints,
  ministryofConsumerAffairspostcomplaint,
  ministryofeducationpostcomplaint,
  ministryofHealthFamilyWelfarepostcomplaint,
  ministryofrailwaypostcomplaint,
  ministryofroadtransportandhighwayspostcomplaint,
  ministryofWomenandChildrenDevelopmentpostcomplaint,
} from "../controllers/complaints.controller.js";
import { sessionProtected } from "../middlewares/cookieprotected.middleware.js";

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Complaints");
});
router
  .route("/ministryofrailwaypostcomplaint")
  .post(sessionProtected, ministryofrailwaypostcomplaint);
router
  .route("/ministryofConsumerAffairspostcomplaint")
  .post(sessionProtected, ministryofConsumerAffairspostcomplaint);
router
  .route("/ministryofHealthFamilyWelfarepostcomplaint")
  .post(sessionProtected, ministryofHealthFamilyWelfarepostcomplaint);
router
  .route("/ministryofWomenandChildrenDevelopmentpostcomplaint")
  .post(sessionProtected, ministryofWomenandChildrenDevelopmentpostcomplaint);
router
  .route("/ministryofeducationpostcomplaint")
  .post(sessionProtected, ministryofeducationpostcomplaint);
router
  .route("/ministryofroadtransportandhighwayspostcomplaint")
  .post(sessionProtected, ministryofroadtransportandhighwayspostcomplaint);
router.route("/getallcomplaints").get(getallcomplaints);

export default router;
