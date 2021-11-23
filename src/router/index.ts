import { Router } from "express";
import { register, login } from "../controllers/user";

const router = Router();

router.get("/", (req, res) => res.send("Hello world"));

router.post("/register", register);
router.post("/login", login);

export default router;
