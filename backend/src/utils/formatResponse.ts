import { Response } from "express";

export const formatResponse = (
  res: Response,
  status: number,
  message: string,
  data: any
) => {
  return res.status(status).send({
    message,
    data,
  });
};
