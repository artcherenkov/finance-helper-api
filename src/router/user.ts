import { Router } from "express";
import { getUserInfo } from "../controllers/user";

const router = Router();

router.get("/", getUserInfo);

export default router;
