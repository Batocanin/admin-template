import { Router } from "express";
import { AuthRoutes } from "../admin/routes/AuthRoutes";

export const indexRoutes = Router();

indexRoutes.use("/auth/admin", AuthRoutes);
