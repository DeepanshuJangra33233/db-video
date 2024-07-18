import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";
import { User } from "../../models/userModel.js";
import { uploadOnCloudinary } from "../../utils/cloudnary.js";
import { ApiResponse } from "../../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, fullName, password, avatar, coverImage } = req.body;

  if (
    [fullName, email, userName, password].some((field) => field?.trim() === "")
  ) {
    return res.status(400).json(new ApiError(400, "All fields are required"));
  }

  // CHECK USER IS ALREADY IN DB OR NOT

  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  });
  if (existedUser) {
    // throw new ApiError(409, "User with email or userName is already exists");
    return res
      .status(409)
      .json(new ApiError(409, "User with email or userName is already exists"));
  }

  //  GET USER AVATAR AND COVER IMAGE
  if (!avatar || !coverImage) {
    // throw new ApiError(400, "Avatar is required");
    return res
      .status(400)
      .json(new ApiError(400, "Avatar and cover is required is required"));
  }

  // UPLOAD FILE ON CLOUDINARY
  const avatarRes = await uploadOnCloudinary(avatar);
  const coverImageRes = await uploadOnCloudinary(coverImage);
  // CRATE USER
  const user = await User.create({
    fullName,
    avatar: avatarRes.url,
    coverImage: coverImageRes?.url || "",
    email,
    password,
    userName: userName.toLowerCase(),
  });

  // GET USER FROM DB
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken" // REMOVE PASSWORD AND REFRESH-TOKEN
  );

  if (!createdUser) {
    // throw new ApiError(500, "Something went wrong while registering the user");
    return res
      .status(500)
      .json(
        new ApiError(500, "Something went wrong while registering the user")
      );
  }

  // SEND USER TO RES
  return res
    .status(201)
    .json(new ApiResponse(200, "User registered successfully", createdUser));
});

export { registerUser };
