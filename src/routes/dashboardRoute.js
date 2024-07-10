import Router from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import {
  getChannelStats,
  getChannelVideos,
} from "../controllers/dashboardController.js";

const router = Router();
router.use(verifyJWT);

router.route("/").get(getChannelVideos);
router.route("/stats").get(getChannelStats);

export default router;
