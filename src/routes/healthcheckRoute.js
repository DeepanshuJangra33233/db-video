import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { healthCheck } from "../controllers/healthCheckController.js";

const router = Router();
router.use(verifyJWT);

router.route("/healthCheck").get(healthCheck);

export default router;
