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

    if (!url) {
      throw new CustomError(404, "Url not found");
    }

    await db
      .updateTable("urls")
      .set((eb) => ({
        clicks: eb("clicks", "+", 1),
      }))
      .where("short_code", "=", shortCode)
      .execute();

    console.log("Redireccionamiento completo");

    res.redirect(301, url.original_url);
  } catch (error) {
    next(error);
  }
};

export default redirect;
