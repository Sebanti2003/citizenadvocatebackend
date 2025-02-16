import express from "express";
import {
  delcomplaint,
  getallcomplaints,
  getdepartmentalcomplaints,
  ministryofConsumerAffairspostcomplaint,
  ministryofeducationpostcomplaint,
  ministryofHealthFamilyWelfarepostcomplaint,
  ministryofrailwaypostcomplaint,
  ministryofroadtransportandhighwayspostcomplaint,
  ministryofWomenandChildrenDevelopmentpostcomplaint,
} from "../controllers/complaints.controller.js";
import { sessionProtected, sessionProtected2 } from "../middlewares/cookieprotected.middleware.js";

const router = express.Router();
router.route("/getallcomplaints").get(getallcomplaints);
router.route("/delecomplaint/:id").delete(delcomplaint);
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

router.route("/eachDepartmentalComplaints/:departmentalid").get(sessionProtected2,getdepartmentalcomplaints);


export default router;
