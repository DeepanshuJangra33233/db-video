import Router from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import {
  getSubscribedChannels,
  getUserChannelSubscribers,
  toggleSubscription,
} from "../controllers/subscriptionController.js";

const router = Router();
router.use(verifyJWT);

router.route("/toggle/:channelId").post(toggleSubscription);
router.route("/user/:channelId").post(getUserChannelSubscribers);
router.route("/subs/:subscriberId").post(getSubscribedChannels);

export default router;
