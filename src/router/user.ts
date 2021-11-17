import { Router } from "express";
import { register } from "../controllers/user";

const router = Router();

// POST /user
router.post("/", register);

export default router;
