import { Router } from "express";
import redirect from "../controllers/redirect";

const router = Router();

router.get("/:shortCode", redirect);

export default router;
