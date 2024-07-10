import { Router } from "express";
import { upload } from "../middlewares/multerMiddleware.js";
import { verifyJwt } from "../middlewares/authMiddleware.js";
import {
  deleteVideo,
  getAllVideos,
  getVideoById,
  publishAVideo,
  togglePublishStatus,
  updateVideo,
} from "../controller/video.controller.js";

const router = Router();
router.use(verifyJwt); // Apply VerifyJwt to all routes in  this file

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
