import type { NextFunction, Request, Response } from "express";
import { successData } from "../utils/response";
import { db } from "../db";
import { CustomError } from "../utils/customError";
import { isURL } from "validator";

const createUrl = async (req: Request, res: Response, next: NextFunction) => {
  const { originalUrl, shortCode } = req.body;
  const user = req.get("user");

  if (!user) {
    throw new CustomError(404, "User id is missing");
  }
  const userId = parseInt(user, 10);

  try {
    const urlFormatValid = isURL(originalUrl, {
      protocols: ["http", "https"],
      require_protocol: true,
      require_host: true,
      allow_underscores: true,
      require_tld: false,
    });

    if (!urlFormatValid) {
      throw new CustomError(404, "Url invalid");
    }

    const url = await db
      .insertInto("urls")
      .values({
        original_url: originalUrl,
        short_code: shortCode,
        user_id: userId,
      })
      .returning(["id", "original_url"])
      .executeTakeFirst();

    return res.json(successData(url));
  } catch (error) {
    next(error);
  }
};

export default createUrl;
