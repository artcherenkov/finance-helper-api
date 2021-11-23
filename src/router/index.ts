import { Router } from "express";

import auth from "../middlewares/auth";
import NotFoundError from "../errors/not-found";
import authRouter from "./auth";
import userRouter from "./user";

const router = Router();

router.use("/user", auth, userRouter);
router.use("/", authRouter);

router.use(auth, () => {
  throw new NotFoundError("Ресурс не найден");
});

export default router;
