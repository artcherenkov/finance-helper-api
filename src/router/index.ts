import { Router } from "express";
import { register, login, getUserInfo } from "../controllers/user";
import auth from "../middlewares/auth";

const router = Router();

router.get("/", (req, res) => res.send("Hello world"));

router.post("/register", register);
router.post("/login", login);

router.get("/user", auth, getUserInfo);

export default router;
