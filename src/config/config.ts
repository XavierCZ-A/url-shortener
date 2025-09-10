import dotenv from "dotenv";

dotenv.config();

interface Config {
  NODE_ENV: string;
  PORT: number;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  BCRYPT_ROUNDS: number;
  CORS_ORIGIN: string;
  API_URL: string;
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
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS || "10"),
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
  API_URL: process.env.API_URL || "http://localhost:3000/api",
  DOMAIN_NAME: process.env.DOMAUN_NAME || "https://1379368b56db.ngrok-free.app",
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
