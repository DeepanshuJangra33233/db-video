import { User } from "../../models/userModel.js";
import { createRefreshAndAccessToken } from "../../utils/createRefreshAndAccessToken.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const loginUser = asyncHandler(async (req, res) => {
  const { email, userName, password } = req.body;

  // THROW ERROR IS USER-NAME OR EMAIL IS EMPTY
  if (!userName && !email) {
    throw new ApiError(400, "UserName or Email is required");
  }

  // FIND USER FROM DB
  const user = await User.findOne({
    $or: [{ userName }, { email }],
  });
  if (!user) {
    throw new ApiError(404, "User dose not exist"); // THROW ERROR IF USER NOT FOUND
  }

  // COMPARE PASSWORD  IS PASSWORD IS CORRECT OR NOT
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Password not match"); // THROW ERROR IF PASSWORD IS NOT CORRECT
  }

  //  CREATE ACCESS AND REFRESH TOKEN
  const { accessToken, refreshToken } = await createRefreshAndAccessToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken" // REMOVE PASSWORD AND REFRESH-TOKEN
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In successfully"
      )
    );
});

export { loginUser };
