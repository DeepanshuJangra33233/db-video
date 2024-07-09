import { asyncHandler } from "../../utils/asyncHandler.js";
import { User } from "../../models/userModel.js";
import mongoose from "mongoose";
import { ApiResponse } from "../../utils/apiResponse.js";

const GetUserWatchHistory = asyncHandler(async (req, res) => {
  const user = await User.aggregate([
    {
      $math: {
        _id: new mongoose.Types.ObjectId(req.usr._id),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "watchHistory",
        foreignField: "_id",
        as: "watchHistory",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
              pipeline: [
                {
                  $project: {
                    fullName: 1,
                    userName: 1,
                    avatar: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              owner: {
                $first: "$owner",
              },
            },
          },
        ],
      },
    },
  ]);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Watch History Fetch Successfully",
        user[0].watchHistory
      )
    );
});
export { GetUserWatchHistory };
