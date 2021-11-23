import express from "express";

const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
const ALLOWED_CORS = ["http://localhost:19006"];

export default (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { method } = req;
  const requestHeaders = req.headers["access-control-request-headers"];
  const { origin } = req.headers;

  if (origin && ALLOWED_CORS.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
  }

  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    res.header("Access-Control-Allow-Headers", requestHeaders);
    res.end();
  }

  next();
};
