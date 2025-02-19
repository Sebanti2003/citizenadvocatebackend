import express from "express";
import { givenotification } from "../controllers/notifications.controller.js";
import { sessionProtected2 } from "../middlewares/cookieprotected.middleware.js";

const router = express.Router();

router.route("/notifications/:id").post(sessionProtected2,givenotification);

export default router;
