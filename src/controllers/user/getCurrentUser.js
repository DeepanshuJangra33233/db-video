import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const GetCurrent = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(400, "User not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Get current user successfully", req.user));
});

export { GetCurrent };
