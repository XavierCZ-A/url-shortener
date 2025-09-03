import { Router } from "express";
import createUrl from "../controllers/createUrl";
import getUrls from "../controllers/getUrl";
import verifyRequest from "../middlewares/verifyRequest";

const router = Router();

router.post("/url", verifyRequest, createUrl);
router.get("/", getUrls);

export default router;
