import { Router } from "express";
import { verifyJwt } from "../middlewares/authMiddleware.js";
import {
  createTweet,
  deleteTweet,
  getUserTweet,
  updateTweet,
} from "../controller/tweet.controller.js";

const router = Router();
router.use(verifyJwt);

router.route("/:userId").get(getUserTweet);
router.route("/t/:tweetId").patch(updateTweet).delete(deleteTweet);
router.route("/create").post(createTweet);

export default router;
