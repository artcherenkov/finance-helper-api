import express from "express";
import Expense from "../models/expense";
import BadRequestError from "../errors/bad-request";

export const getExpenses = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const userId = res.locals.user._id;

  Expense.find({})
    .populate("user")
    .then((c) => {
      const filteredExpenses = c.filter((ex) => String(ex.owner) === userId);
      res.send({ data: filteredExpenses });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(
          new BadRequestError("При удалении карточки передан некорректный _id")
        );
      }
      next(err);
    });
};

export const postExpense = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const userId = res.locals.user._id;
  const { type, title, amount } = req.body;

  Expense.create({ type, title, amount, owner: userId })
    .then((c) => res.send({ data: c }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(
          new BadRequestError(
            "При создании карточки переданы некорректные данные"
          )
        );
      }

      next(err);
    });
};
