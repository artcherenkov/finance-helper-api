import { Router } from "express";
import userRouter from "./user";

const router = Router();

router.get("/", (req, res) => res.send("Hello world"));

router.use("/user", userRouter);

export default router;
