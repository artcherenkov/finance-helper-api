import mongoose from "mongoose";
import express from "express";

import User, { IUser } from "../models/user";
import BadRequestError from "../errors/bad-request";
import ConflictError from "../errors/conflict";

export const register = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  User.create({ ...req.body })
    .then((u: mongoose.Document<IUser>) => {
      const createdUser = u.toObject() as { email: string; password?: string };
      delete createdUser.password;

      res.status(201).send({ data: createdUser });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(
          new BadRequestError(
            "При создании пользователя переданы некорректные данные."
          )
        );
      }
      if (err.name === "MongoError" && err.code === 11000) {
        next(
          new ConflictError("Пользователь с таким email уже зарегистрирован.")
        );
      }
    });
};
