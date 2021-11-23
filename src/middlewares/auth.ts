import express from "express";

const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/unauthorized");

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
};
