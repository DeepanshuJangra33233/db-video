import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";
import { uploadOnCloudinary } from "../../utils/cloudnary.js";
import { User } from "../../models/userModel.js";
import { ApiResponse } from "../../utils/apiResponse.js";

const UpdateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }
  //   UPLOAD FILE ON CLOUDINARY
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  // IF AVATAR IS NOT THERE
  if (!avatar.url) {
    throw new ApiError(400, "Error while uploading on avatar");
  }

  // UPDATE USER AVATAR FROM DB
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true }
  ).select("-password");
  return res
    .status(200)
    .json(new ApiResponse(200, "User Avatar image update Successfully", user));
});

export { UpdateUserAvatar };
