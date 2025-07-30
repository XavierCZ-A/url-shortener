import { Request, Response, NextFunction } from "express";
import { db } from "../db";
import { successData } from "../utils/response";
import { CustomError } from "../utils/customError";

async function getUrls(req: Request, res: Response, next: NextFunction) {
  const user = req.get("user");

  if (!user) {
    throw new CustomError(404, "User id is missing");
  }

  const userId = parseInt(user, 10);

  try {
    const urls = await db
      .selectFrom("urls")
      .select(["original_url"])
      .where("user_id", "=", userId)
      .execute();
    return res.json(successData(urls));
  } catch (error) {
    next(error);
  }
}

export default getUrls;
