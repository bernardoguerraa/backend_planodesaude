import { Request, Response, NextFunction } from "express";
import AppGeneralError from "../aplication/error/AppError";

async function handleError(
  err: Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): Promise<Response> {
  if (err instanceof AppGeneralError) {
    return response.status(err.httpCode).json({
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    message: "Unexpected exception occurred",
  });
}

export default handleError;
