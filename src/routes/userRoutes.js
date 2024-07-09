import { Router } from "express";
import { registerUser } from "../controllers/user/registerUserController.js";
import { upload } from "../middlewares/multerMiddleware.js";
import { loginUser } from "../controllers/user/loginUserController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { logoutUser } from "../controllers/user/logoutUser.js";
import { refreshAccessToken } from "../controllers/user/refreshAccessToken.js";
import { ChangeUserPassword } from "../controllers/user/changeUserPassword.js";
import { GetCurrent } from "../controllers/user/getCurrentUser.js";
import { UpdateUserCoverImage } from "../controllers/user/updateUserCoverImage.js";
import { UpdateUserAvatar } from "../controllers/user/updateUserAvatar.js";
import { GetUserWatchHistory } from "../controllers/user/getUserWatchHistory.js";
import { GetUserChannelProfile } from "../controllers/user/getUserChannelProfile.js";
import { UpdateAccountDetail } from "../controllers/user/updateAccountDetail.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// SECURED ROUTE
router.route("/logout").post(verifyJWT, logoutUser);

router.route("/refresh-token").post(refreshAccessToken);

router.route("/change-password").post(verifyJWT, ChangeUserPassword);

router.route("/current-user").get(verifyJWT, GetCurrent);

router.route("/update-account").patch(verifyJWT, UpdateAccountDetail);

router
  .route("/coverImage")
  .patch(verifyJWT, upload.single("coverImage"), UpdateUserCoverImage);

router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), UpdateUserAvatar);

router.route("/c/:userName").get(verifyJWT, GetUserChannelProfile);

router.route("/watch-history").get(verifyJWT, GetUserWatchHistory);

export default router;
