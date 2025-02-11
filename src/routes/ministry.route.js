import express from "express";
import { login, signup } from "../controllers/ministryauth.controller";
import { ministryroleCheck } from "../middlewares/rolecheck.middleware";
import { sessionProtected2 } from "../middlewares/cookieprotected.middleware";
import { getministryinfo } from "../controllers/ministry.controller";
const router = express.Router();

router.route("/auth/signup").post(signup);
router.route("/auth/login").post(login);

router.route("/me").get(sessionProtected2, ministryroleCheck, getministryinfo);

export default router;
