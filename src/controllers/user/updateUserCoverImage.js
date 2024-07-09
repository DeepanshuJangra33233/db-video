import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";
import { uploadOnCloudinary } from "../../utils/cloudnary.js";
import { User } from "../../models/userModel.js";
import { ApiResponse } from "../../utils/apiResponse.js";

const UpdateUserCoverImage = asyncHandler(async (req, res) => {
  const coverImageLocalPath = req.file?.path;

  if (!coverImageLocalPath) {
    throw new ApiError(400, "Cover image is missing");
  }
  //   UPLOAD FILE ON CLOUDINARY
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  // IF AVATAR IS NOT THERE
  if (!coverImage.url) {
    throw new ApiError(400, "Error while uploading on avatar");
  }

  // UPDATE USER AVATAR FROM DB
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        coverImage: coverImage.url,
      },
    },
    { new: true }
  ).select("-password");
  return res
    .status(200)
    .json(new ApiResponse(200, "User Cover image update Successfully", user));
});

export { UpdateUserCoverImage };
