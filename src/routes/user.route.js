import express from "express";
import { login, logout, signup } from "../controllers/userauth.controller";
import { userroleCheck } from "../middlewares/rolecheck.middleware";
import { sessionProtected } from "../middlewares/cookieprotected.middleware";
import { getuserinfo } from "../controllers/user.controller";
const router = express.Router();

router.route("/auth/signup").post(signup);
router.route("/auth/login").post(login);
router.route('/auth/logout').get(logout);

router.route("/me").get(sessionProtected, userroleCheck, getuserinfo);

export default router;
