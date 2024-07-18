import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"],
  })
);

app.use(express.json({ limit: "5gb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// IMPORT ROUTES
import userRoutes from "./routes/userRoutes.js";
import videoRouter from "./routes/videoRoute.js";
import likeRouter from "./routes/likeRoute.js";
import commentRouter from "./routes/commentRoute.js";
import tweetRouter from "./routes/tweetRoute.js";
import playlistRouter from "./routes/playlistRoute.js";
import subsRouter from "./routes/subscriptionRoute.js";
import dashboard from "./routes/dashboardRoute.js";
// import healthCheckRoute from "./routes/healthCheckRoute.js";

// ROUTES DECLARATION
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/tweets", tweetRouter);
app.use("/api/v1/playlist", playlistRouter);
app.use("/api/v1/subscription", subsRouter);
app.use("/api/v1/dashboard", dashboard);
// app.use("/api/v1/health", healthCheckRoute);

export { app };
