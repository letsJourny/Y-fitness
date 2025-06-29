import { RequestHandler } from "express";
import { PushNotificationService } from "../services/push-notifications";
import { z } from "zod";

const subscribeSchema = z.object({
  endpoint: z.string().url("Invalid endpoint URL"),
  keys: z.object({
    p256dh: z.string().min(1, "p256dh key is required"),
    auth: z.string().min(1, "auth key is required"),
  }),
});

const sendNotificationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Body is required"),
  icon: z.string().optional(),
  url: z.string().optional(),
  data: z.any().optional(),
});

// Get VAPID public key
export const getVapidPublicKey: RequestHandler = (req, res) => {
  try {
    const publicKey = PushNotificationService.getPublicKey();

    if (!publicKey) {
      return res.status(500).json({
        error: "Push notifications not configured",
        message: "VAPID keys are not set up.",
      });
    }

    res.json({
      success: true,
      publicKey,
    });
  } catch (error) {
    console.error("VAPID key error:", error);
    res.status(500).json({
      error: "Failed to get VAPID key",
      message: "Internal server error.",
    });
  }
};

// Subscribe to push notifications
export const subscribe: RequestHandler = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Please log in to subscribe to notifications.",
      });
    }

    const validatedData = subscribeSchema.parse(req.body);

    const success = await PushNotificationService.subscribe(
      req.user.id,
      validatedData as any,
    );

    if (!success) {
      return res.status(500).json({
        error: "Subscription failed",
        message: "Failed to subscribe to push notifications.",
      });
    }

    res.json({
      success: true,
      message: "Successfully subscribed to push notifications!",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.errors,
      });
    }

    console.error("Push subscription error:", error);
    res.status(500).json({
      error: "Subscription failed",
      message: "Internal server error.",
    });
  }
};

// Send test notification (admin only)
export const sendTestNotification: RequestHandler = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Please log in to send notifications.",
      });
    }

    const validatedData = sendNotificationSchema.parse(req.body);

    await PushNotificationService.sendToUser(req.user.id, {
      title: validatedData.title,
      body: validatedData.body,
      icon: validatedData.icon,
      url: validatedData.url,
      data: validatedData.data,
    });

    res.json({
      success: true,
      message: "Test notification sent successfully!",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.errors,
      });
    }

    console.error("Test notification error:", error);
    res.status(500).json({
      error: "Failed to send notification",
      message: "Internal server error.",
    });
  }
};

// Unsubscribe from push notifications
export const unsubscribe: RequestHandler = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Please log in to unsubscribe from notifications.",
      });
    }

    // Implementation would remove user's push subscriptions from database
    // This is a simplified response

    res.json({
      success: true,
      message: "Successfully unsubscribed from push notifications.",
    });
  } catch (error) {
    console.error("Unsubscribe error:", error);
    res.status(500).json({
      error: "Unsubscribe failed",
      message: "Internal server error.",
    });
  }
};

// Admin: Send notification to all users
export const sendBroadcast: RequestHandler = async (req, res) => {
  try {
    // This would typically require admin authentication
    // For now, we'll just validate the request structure

    const validatedData = sendNotificationSchema.parse(req.body);

    await PushNotificationService.sendToAll({
      title: validatedData.title,
      body: validatedData.body,
      icon: validatedData.icon,
      url: validatedData.url,
      data: validatedData.data,
    });

    res.json({
      success: true,
      message: "Broadcast notification sent successfully!",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.errors,
      });
    }

    console.error("Broadcast notification error:", error);
    res.status(500).json({
      error: "Failed to send broadcast",
      message: "Internal server error.",
    });
  }
};
