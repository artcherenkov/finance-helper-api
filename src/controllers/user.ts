import mongoose from "mongoose";
import express from "express";
import jwt from "jsonwebtoken";

import User, { IUser } from "../models/user";
import BadRequestError from "../errors/bad-request";
import ConflictError from "../errors/conflict";

const { JWT_SECRET = "super-strong-secret" } = process.env;

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

export const login = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((u: mongoose.Document<IUser>) => {
      const token = jwt.sign({ _id: u._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res
        .cookie("jwt", token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: "Вы успешно вошли в свой аккаунт." });
    })
    .catch(next);
};
