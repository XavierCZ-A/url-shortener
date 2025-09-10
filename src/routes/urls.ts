import { Router } from "express";
import createUrl from "../controllers/createUrl";
import getUrls from "../controllers/getUrl";
import verifyRequest from "../middlewares/verifyRequest";
import createQRCode from "../controllers/qrCode";

const router = Router();

router.post("/url", verifyRequest, createUrl);
router.get("/", getUrls);
router.get("/qrcode", createQRCode);

export default router;
