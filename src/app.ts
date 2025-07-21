import express, { type Request, type Response } from "express";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());

app.get("/ping", (req: Request, res: Response) =>
  res.status(200).send(Date.now().toString()),
);

export default app;
