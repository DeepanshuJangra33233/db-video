import { User } from "../../models/userModel.js";
import { createRefreshAndAccessToken } from "../../utils/createRefreshAndAccessToken.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const loginUser = asyncHandler(async (req, res) => {
  const { email, userName, password } = req.body;
  console.log("email,", userName, email);

  // THROW ERROR IS USER-NAME OR EMAIL IS EMPTY
  if (!userName && !email) {
    // throw new ApiError(400, "UserName or Email is required");
    return res
      .status(400)
      .json(new ApiError(400, "UserName or Email is required"));
  }

  // FIND USER FROM DB
  const user = await User.findOne({
    $or: [{ userName }, { email }],
  });
  if (!user) {
    // throw new ApiError(404, "User dose not exist"); // THROW ERROR IF USER NOT FOUND
    return res.status(404).json(new ApiError(404, "User dose not exist"));
  }

  // COMPARE PASSWORD  IS PASSWORD IS CORRECT OR NOT
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    // throw new ApiError(401, "Password not match"); // THROW ERROR IF PASSWORD IS NOT CORRECT
    return res.status(401).json(new ApiError(401, "Password not match"));
  }

  //  CREATE ACCESS AND REFRESH TOKEN
  const { accessToken, refreshToken } = await createRefreshAndAccessToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken" // REMOVE PASSWORD AND REFRESH-TOKEN
  );
  const options = {
    // domain: "localhost",
    path: "/",
    httpOnly: true,
    // secure: true,
    maxAge: 3600000,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, "User logged In successfully", {
        user: loggedInUser,
        accessToken,
        refreshToken,
      })
    );
});

export { loginUser };
