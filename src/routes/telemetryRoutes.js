import { createTelemetry } from "../controllers/telemetryController.js";
import { Router } from 'express';

const router = Router();

router.post('/', createTelemetry);
export default router;