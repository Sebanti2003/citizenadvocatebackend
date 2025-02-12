import express from "express";
import { login, logout, signup } from "../controllers/userauth.controller.js";
import { userroleCheck } from "../middlewares/rolecheck.middleware.js";
import { sessionProtected } from "../middlewares/cookieprotected.middleware.js";
import { getuserinfo } from "../controllers/user.controller.js";
const router = express.Router();

router.route("/auth/signup").post(signup);
router.route("/auth/login").post(login);
router.route('/auth/logout').get(logout);

router.route("/me").get(sessionProtected, userroleCheck, getuserinfo);

export default router;
