import { Router } from "express";
import createUrl from "../controllers/createUrl";

const router = Router();

router.post("/url", createUrl);

export default router;
