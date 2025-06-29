import webpush from "web-push";
import { DatabaseService } from "./database";

// VAPID keys configuration
const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;
const vapidEmail = process.env.VAPID_EMAIL;

if (vapidPublicKey && vapidPrivateKey && vapidEmail) {
  webpush.setVapidDetails(
    `mailto:${vapidEmail}`,
    vapidPublicKey,
    vapidPrivateKey,
  );
}

export interface PushNotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  image?: string;
  url?: string;
  actions?: Array<{
    action: string;
    title: string;
    icon?: string;
  }>;
  data?: any;
}

export class PushNotificationService {
  static isConfigured(): boolean {
    return !!(vapidPublicKey && vapidPrivateKey && vapidEmail);
  }

  static getPublicKey(): string | null {
    return vapidPublicKey || null;
  }

  // Subscribe user to push notifications
  static async subscribe(
    userId: string,
    subscription: PushSubscription,
  ): Promise<boolean> {
    try {
      await DatabaseService.savePushSubscription(userId, {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: subscription.keys.p256dh,
          auth: subscription.keys.auth,
        },
      });

      // Send welcome notification
      await this.sendToUser(userId, {
        title: "Welcome to Yousef Recharge! 🎉",
        body: "You'll now receive workout reminders and progress updates.",
        icon: "/icons/icon-192x192.png",
        badge: "/icons/icon-72x72.png",
        url: "/dashboard",
      });

      return true;
    } catch (error) {
      console.error("Push subscription error:", error);
      return false;
    }
  }

  // Send notification to specific user
  static async sendToUser(
    userId: string,
    payload: PushNotificationPayload,
  ): Promise<void> {
    if (!this.isConfigured()) {
      console.warn("Push notifications not configured");
      return;
    }

    try {
      const subscriptions =
        await DatabaseService.getUserPushSubscriptions(userId);

      const notifications = subscriptions.map((sub) =>
        this.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: sub.keys as any,
          },
          payload,
        ),
      );

      await Promise.allSettled(notifications);
    } catch (error) {
      console.error("Failed to send push notification:", error);
    }
  }

  // Send notification to multiple users
  static async sendToUsers(
    userIds: string[],
    payload: PushNotificationPayload,
  ): Promise<void> {
    const notifications = userIds.map((userId) =>
      this.sendToUser(userId, payload),
    );
    await Promise.allSettled(notifications);
  }

  // Send notification to all users
  static async sendToAll(payload: PushNotificationPayload): Promise<void> {
    // This would require a method to get all user subscriptions
    // Implementation depends on your needs and database structure
    console.log("Sending to all users:", payload.title);
  }

  // Core notification sending function
  private static async sendNotification(
    subscription: PushSubscription,
    payload: PushNotificationPayload,
  ): Promise<void> {
    try {
      const notificationPayload = JSON.stringify({
        title: payload.title,
        body: payload.body,
        icon: payload.icon || "/icons/icon-192x192.png",
        badge: payload.badge || "/icons/icon-72x72.png",
        image: payload.image,
        data: {
          url: payload.url || "/",
          ...payload.data,
        },
        actions: payload.actions || [
          {
            action: "open",
            title: "Open App",
          },
        ],
        requireInteraction: false,
        tag: "yousef-recharge-notification",
      });

      await webpush.sendNotification(subscription, notificationPayload);
    } catch (error: any) {
      // Handle expired subscriptions
      if (error.statusCode === 410) {
        console.log("Subscription expired, removing from database");
        // You might want to remove this subscription from database
      } else {
        console.error("Push notification error:", error);
      }
    }
  }

  // Predefined notification templates
  static async sendWorkoutReminder(
    userId: string,
    workoutName: string,
    time: string,
  ): Promise<void> {
    await this.sendToUser(userId, {
      title: "⏰ Workout Reminder",
      body: `"${workoutName}" is scheduled for ${time}. Ready to crush it?`,
      icon: "/icons/workout-icon.png",
      url: "/plans",
      actions: [
        {
          action: "start-workout",
          title: "Start Now",
        },
        {
          action: "snooze",
          title: "Remind Later",
        },
      ],
      data: {
        type: "workout-reminder",
        workoutName,
        time,
      },
    });
  }

  static async sendMealReminder(
    userId: string,
    mealType: string,
    calories: number,
  ): Promise<void> {
    await this.sendToUser(userId, {
      title: "🍽️ Meal Time!",
      body: `Time for ${mealType} (${calories} calories planned). Don't forget to log it!`,
      icon: "/icons/meal-icon.png",
      url: "/plans",
      actions: [
        {
          action: "log-meal",
          title: "Log Meal",
        },
      ],
      data: {
        type: "meal-reminder",
        mealType,
        calories,
      },
    });
  }

  static async sendProgressUpdate(
    userId: string,
    achievement: string,
  ): Promise<void> {
    await this.sendToUser(userId, {
      title: "🎉 New Achievement!",
      body: achievement,
      icon: "/icons/trophy-icon.png",
      url: "/progress",
      actions: [
        {
          action: "view-progress",
          title: "View Progress",
        },
        {
          action: "share",
          title: "Share",
        },
      ],
      data: {
        type: "achievement",
        achievement,
      },
    });
  }

  static async sendStreakCelebration(
    userId: string,
    streakDays: number,
  ): Promise<void> {
    await this.sendToUser(userId, {
      title: "🔥 Streak Milestone!",
      body: `Amazing! You've maintained your workout streak for ${streakDays} days!`,
      icon: "/icons/fire-icon.png",
      url: "/dashboard",
      actions: [
        {
          action: "continue-streak",
          title: "Keep Going!",
        },
      ],
      data: {
        type: "streak-celebration",
        streakDays,
      },
    });
  }

  static async sendWeeklyReport(
    userId: string,
    workoutsCompleted: number,
    totalWorkouts: number,
  ): Promise<void> {
    const completionRate = Math.round(
      (workoutsCompleted / totalWorkouts) * 100,
    );

    await this.sendToUser(userId, {
      title: "📊 Weekly Report",
      body: `You completed ${workoutsCompleted}/${totalWorkouts} workouts this week (${completionRate}%)`,
      icon: "/icons/chart-icon.png",
      url: "/progress",
      actions: [
        {
          action: "view-report",
          title: "View Details",
        },
      ],
      data: {
        type: "weekly-report",
        workoutsCompleted,
        totalWorkouts,
        completionRate,
      },
    });
  }

  // Cleanup expired subscriptions
  static async cleanupExpiredSubscriptions(): Promise<void> {
    // This would be implemented based on your database structure
    // You might want to run this periodically to remove invalid subscriptions
  }
}

// Utility function to generate VAPID keys (run once)
export const generateVapidKeys = (): {
  publicKey: string;
  privateKey: string;
} => {
  return webpush.generateVAPIDKeys();
};
