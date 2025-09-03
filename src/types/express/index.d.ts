import express from "express";

declare global {
  namespace Express {
    interface Request {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      user?: Record<string, any>;
    }
  }
}
