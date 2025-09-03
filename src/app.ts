import express, { type Request, type Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";
import router from "./routes/urls";
import redirectRouter from "./routes/redirect";
import rateLimit from "express-rate-limit";
import cors from "cors";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
});

app.use(cors());
app.use(limiter);
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/ping", (_req: Request, res: Response) =>
  res.status(200).send(Date.now().toString()),
);

app.use("/api", router);
app.use("/", redirectRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
