import express from "express";
import jwt from "jsonwebtoken";

import UnauthorizedError from "../errors/unauthorized";

const { JWT_SECRET = "super-strong-secret" } = process.env;

const handleAuthError = (next: express.NextFunction) => {
  next(new UnauthorizedError("Необходима авторизация"));
};

export default (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { jwt: token } = req.cookies;

  try {
    if (!token) {
      return handleAuthError(next);
    }

    let payload;

    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return handleAuthError(next);
    }

    res.locals.user = payload;
    return next();
  } catch (err) {
    console.log(err);
  }
};
