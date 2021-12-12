import { Router } from "express";
import { getExpenses, postExpense } from "../controllers/expense";

const router = Router();

router.get("/", getExpenses);
router.post("/", postExpense);

export default router;
