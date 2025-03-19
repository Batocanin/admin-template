import { Request, Response } from "express";
import { formatErrorResponse } from "../../utils/formatErrorResponse";
import { formatResponse } from "../../utils/formatResponse";
import { signin, signup } from "../services/AuthServices";
import {
  deleteSession,
  setSessionTokenCookie,
  validateSessionToken,
} from "../models/AuthModels";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

export const signinHandler = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const loggedUser = await signin(res, { username, password });

    formatResponse(res, 200, "Successfully signed in.", loggedUser);
  } catch (error) {
    formatErrorResponse(
      res,
      "There was an error while trying to sign in.",
      error instanceof Error ? error : null
    );
  }
};

export const signupHandler = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    const registeredUser = await signup(res, { email, username, password });

    formatResponse(res, 200, "Successfully signed up.", registeredUser);
  } catch (error) {
    formatErrorResponse(
      res,
      "There was an error while trying to sign up.",
      error instanceof Error ? error : null
    );
  }
};

export const logoutHandler = async (req: Request, res: Response) => {
  try {
    const token = req.cookies["session"];

    if (!token) {
      formatResponse(res, 404, "Session token not found.", null);
      return;
    }

    const sessionId = encodeHexLowerCase(
      sha256(new TextEncoder().encode(token))
    );

    await deleteSession(sessionId);

    formatResponse(res, 200, "Successfully logged out.", true);
  } catch (error) {
    formatErrorResponse(
      res,
      "There was an error while trying to log out.",
      error instanceof Error ? error : null
    );
  }
};

export const resetPasswordHandler = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    formatErrorResponse(
      res,
      "There was an error while trying to reset password.",
      error instanceof Error ? error : null
    );
  }
};

export const validateRequestHandler = async (req: Request, res: Response) => {
  try {
    const token = req.cookies["session"];

    if (!token) {
      formatResponse(res, 404, "Session token not found.", null);
      return;
    }

    const session = await validateSessionToken(token);

    if (!session) {
      formatResponse(res, 401, "Session token not valid.", null);
      return;
    }

    formatResponse(res, 200, "Successfully validated session token", session);
  } catch (error) {
    formatErrorResponse(
      res,
      "There was an error while trying to validate session token.",
      error instanceof Error ? error : null
    );
  }
};
