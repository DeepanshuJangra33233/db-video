import { User } from "../../models/userModel.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const ChangeUserPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  // GET USER FROM REQUEST
  const user = await User.findById(req.user?._id);
  //   COMPARE PASSWORD
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Old password is not correct");
  }

  //  SET NEW PASSWORD
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, "Password change successfully"));
});

export { ChangeUserPassword };
