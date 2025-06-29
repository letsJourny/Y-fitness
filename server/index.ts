import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handleRegistration,
  handleContact,
  handleSendOTP,
  handleGetProfile,
} from "./routes/auth";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // Auth & User routes
  app.post("/api/auth/register", handleRegistration);
  app.post("/api/auth/send-otp", handleSendOTP);
  app.get("/api/users/:userId", handleGetProfile);

  // Contact route
  app.post("/api/contact", handleContact);

  return app;
}
