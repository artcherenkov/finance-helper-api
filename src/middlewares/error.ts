import express, { ErrorRequestHandler } from "express";
import { TCustomError } from "../errors/types";

const handler: ErrorRequestHandler = (
  err: TCustomError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
};

export default handler;
