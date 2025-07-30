import { Router } from "express";
import createUrl from "../controllers/createUrl";
import getUrls from "../controllers/getUrl";

const router = Router();

router.post("/url", createUrl);
router.get("/", getUrls);

export default router;
