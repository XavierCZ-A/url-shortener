import type { NextFunction, Request, Response } from "express";
import { successData } from "../utils/response";
import { db } from "../db";
import { CustomError } from "../utils/customError";
import { isURL } from "validator";
import generateShortCode from "../utils/generteShortCode";
import { config } from "../config/config";

const createUrl = async (req: Request, res: Response, next: NextFunction) => {
  const { urlData } = req.body;
  const user = req.user;
  const shortCode = generateShortCode();

  try {
    const urlFormatValid = isURL(urlData.originalUrl, {
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
        original_url: urlData.originalUrl,
        short_code: shortCode,
        user_id: user?.id,
        expires_at: urlData?.expiresAt,
      })
      .returning(["original_url"])
      .executeTakeFirst();

    const shortUrl = `${config.DOMAIN_NAME}/${shortCode}`;

    const response = {
      url: url?.original_url,
      shortUrl: shortUrl,
      expiresAt: urlData?.expiresAt,
    };

    return res.json(successData(response));
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default createUrl;
