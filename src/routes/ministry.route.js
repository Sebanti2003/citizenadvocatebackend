import express from "express";
import { login, logout, signup } from "../controllers/ministryauth.controller.js";
import { ministryroleCheck } from "../middlewares/rolecheck.middleware.js";
import { sessionProtected2 } from "../middlewares/cookieprotected.middleware.js";
import { getministryinfo } from "../controllers/ministry.controller.js";
const router = express.Router();

router.route("/auth/signup").post(signup);
router.route("/auth/login").post(login);
router.route('/auth/logout').get(logout);

router.route("/me").get(sessionProtected2, ministryroleCheck, getministryinfo);

export default router;
