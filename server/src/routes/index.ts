import { Router } from "express";

import { authRoutes } from "../modules/auth";
import { userRoutes } from "../modules/user";
import { incidentRoutes } from "../modules/incident";
import { volunteerRoutes } from "../modules/volunteer";
import { hospitalRoutes } from "../modules/hospital";
import { shelterRoutes } from "../modules/shelter";
import { ngoRoutes } from "../modules/ngo";
import { analyticsRoutes } from "../modules/analytics";
import { notificationRoutes } from "../modules/notification";
import { aiRoutes } from "../modules/ai";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/incidents", incidentRoutes);
router.use("/volunteers", volunteerRoutes);
router.use("/hospitals", hospitalRoutes);
router.use("/shelters", shelterRoutes);
router.use("/ngos", ngoRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/notifications", notificationRoutes);
router.use("/ai", aiRoutes);

export default router;