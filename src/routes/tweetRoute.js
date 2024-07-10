import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import {
  createTweet,
  deleteTweet,
  getUserTweet,
  updateTweet,
} from "../controllers/tweetController.js";

const router = Router();
router.use(verifyJWT);

router.route("/:userId").get(getUserTweet);
router.route("/t/:tweetId").patch(updateTweet).delete(deleteTweet);
router.route("/create").post(createTweet);

export default router;
