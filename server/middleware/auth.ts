import { RequestHandler } from "express";
import { DatabaseService } from "../services/database";

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        fullName: string;
        isVerified: boolean;
      };
    }
  }
}

export const authenticateToken: RequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        error: "Access token required",
        message: "Please provide a valid access token.",
      });
    }

    const session = await DatabaseService.validateSession(token);

    if (!session) {
      return res.status(401).json({
        error: "Invalid token",
        message: "Your session has expired. Please log in again.",
      });
    }

    // Add user to request object
    req.user = {
      id: session.user.id,
      email: session.user.email,
      fullName: session.user.fullName,
      isVerified: session.user.isVerified,
    };

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({
      error: "Authentication failed",
      message: "Internal server error during authentication.",
    });
  }
};

export const requireVerified: RequestHandler = (req, res, next) => {
  if (!req.user?.isVerified) {
    return res.status(403).json({
      error: "Account not verified",
      message: "Please verify your account before accessing this resource.",
    });
  }
  next();
};

export const optionalAuth: RequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (token) {
      const session = await DatabaseService.validateSession(token);
      if (session) {
        req.user = {
          id: session.user.id,
          email: session.user.email,
          fullName: session.user.fullName,
          isVerified: session.user.isVerified,
        };
      }
    }

    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};
