import Router from "express";
import { verifyJwt } from "../middlewares/authMiddleware.js";
import {
  getChannelStats,
  getChannelVideos,
} from "../controller/dashboard.controller.js";

const router = Router();
router.use(verifyJwt);

router.route("/").get(getChannelVideos);
router.route("/stats").get(getChannelStats);

export default router;
