import dotenv from "dotenv";

dotenv.config();

interface Config {
  NODE_ENV: string;
  PORT: number;
  JWT_SECRET: string;
  DOMAIN_NAME: string;
  DATABASE_USER: string;
  DATABASE_NAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_PORT: number;
  DATABASE_HOST: string;
}

const config: Config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "3000"),
  JWT_SECRET: process.env.JWT_SECRET || "your-secret-key",
  DOMAIN_NAME: process.env.DOMAUN_NAME || "http://localhost:3000",
  DATABASE_USER: process.env.DATABASE_USER || "xavier",
  DATABASE_NAME: process.env.DATABASE_NAME || "url_short",
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || "secretPassword",
  DATABASE_PORT: parseInt(process.env.DATABASE_PORT || "5435"),
  DATABASE_HOST: process.env.DATABASE_HOST || "localhost",
};

const requiredEnvVars = ["JWT_SECRET"];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export { config };
