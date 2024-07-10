import { Router } from "express";
import { upload } from "../middlewares/multerMiddleware.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import {
  deleteVideo,
  getAllVideos,
  getVideoById,
  publishAVideo,
  togglePublishStatus,
  updateVideo,
} from "../controllers/videoController.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT to all routes in  this file

router
  .route("/")
  .get(getAllVideos)
  .post(
    upload.fields([
      {
        name: "videoFile",
        maxCount: 1,
      },
      {
        name: "thumbnail",
        maxCount: 1,
      },
    ]),

    publishAVideo
  );

router
  .route("/video/:video_id")
  .get(getVideoById)
  .patch(upload.single("thumbnailLocalPath"), updateVideo)
  .delete(deleteVideo);

router.route("/toggleStatus/:videoId").patch(togglePublishStatus);

export default router;
