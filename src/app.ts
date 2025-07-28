import express, { urlencoded, type Request, type Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";
import router from "./routes/urls";

const app = express();

app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/ping", (req: Request, res: Response) =>
  res.status(200).send(Date.now().toString()),
);

app.use("/api", router);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
