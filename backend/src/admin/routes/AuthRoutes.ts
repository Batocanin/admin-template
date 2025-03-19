import { Router } from "express";
import {
  logoutHandler,
  resetPasswordHandler,
  signinHandler,
  signupHandler,
  validateRequestHandler,
} from "../controllers/AuthHandler";

export const AuthRoutes = Router();

AuthRoutes.post("/signin", signinHandler);
AuthRoutes.post("/signup", signupHandler);
AuthRoutes.post("/logout", logoutHandler);
AuthRoutes.post("/reset-password", resetPasswordHandler);
AuthRoutes.get("/validate-request", validateRequestHandler);
