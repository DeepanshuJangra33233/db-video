import { Router } from "express";
import { verifyJwt } from "../middlewares/authMiddleware.js";
import { healthCheck } from "../controllers/healthCheckController.js";

const router = Router();
router.use(verifyJwt);

router.route("/healthCheck").get(healthCheck);

export default router;
