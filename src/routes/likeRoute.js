import Router from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import {
  getAllLikedVideo,
  toggleCommentLike,
  toggleTweetLike,
  toggleVideoLikes,
} from "../controllers/likeController.js";

const router = Router();
router.use(verifyJWT);

router.route("/:videoId").post(toggleVideoLikes);
router.route("/comment/:commentId").post(toggleCommentLike);
router.route("/tweet/:tweetId").post(toggleTweetLike);
router.route("/videos").get(getAllLikedVideo);

export default router;
