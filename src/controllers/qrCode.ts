import { NextFunction, Request, Response } from "express";
import QRCode from "qrcode";

const createQRCode = (_req: Request, res: Response, _next: NextFunction) => {
  const data = "https://1379368b56db.ngrok-free.app/HZzAAeh";
  QRCode.toString(data, { type: "terminal" }, function (err, url) {
    if (err) return console.log("error occurred");
    console.log(url);
  });

  res.json("hello");
};

export default createQRCode;
