import { Response } from "express";
import { AppError } from "./AppError";

export const formatErrorResponse = (
  res: Response,
  defaultMessage: string,
  error: Error | null = null,
  statusCode: number = 500
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).send({
      message: error.message,
      error: {
        details: error.details || "There's no info about error...",
      },
    });
  }

  return res.status(statusCode).send({
    message: defaultMessage,
    error: {
      details: error?.message || "There's no info about error...",
    },
  });
};
