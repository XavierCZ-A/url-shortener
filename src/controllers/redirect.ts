import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/customError";
import { db } from "../db";

const redirect = async (req: Request, res: Response, next: NextFunction) => {
  const { shortCode } = req.params;

  try {
    const url = await db
      .selectFrom("urls")
      .select(["original_url"])
      .where("short_code", "=", shortCode)
      .executeTakeFirst();

    console.log("shor url se inicio");

    if (!url) {
      throw new CustomError(404, "Url not found");
    }

    return res.redirect(301, url.original_url);
  } catch (error) {
    next(error);
  }
};

export default redirect;
