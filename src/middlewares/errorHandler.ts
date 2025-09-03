import type { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/customError";
import { errorMessage } from "../utils/response";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("Error:", error.message);
  console.error("Stack:", error.stack);

  let statusCode = 500;
  let response: any;

  if (error instanceof CustomError) {
    statusCode = error.statusCode;
    response = error.responseData;
  } else {
    statusCode = error.statusCode || 500;
    response =
      error.responseData ||
      errorMessage(statusCode, error.message || "Something went wrong");
  }

  if (process.env.NODE_ENV === "development") {
    response.stack = error.stack;
  }

  res.status(statusCode).json(response);
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const message = `Route ${req.method} ${req.path} not found`;
  return next(new CustomError(404, message));
};
