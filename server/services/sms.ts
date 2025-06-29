import twilio from "twilio";

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

let twilioClient: twilio.Twilio | null = null;

if (accountSid && authToken) {
  twilioClient = twilio(accountSid, authToken);
}

export class SMSService {
  static isConfigured(): boolean {
    return !!(accountSid && authToken && twilioPhoneNumber);
  }

  static async sendOTP(phone: string, otp: string): Promise<boolean> {
    if (!this.isConfigured()) {
      console.warn("SMS service not configured. OTP:", otp);
      return true; // Return true for development
    }

    try {
      const message = await twilioClient!.messages.create({
        body: `Your Yousef Recharge verification code is: ${otp}. This code will expire in 10 minutes.`,
        from: twilioPhoneNumber,
        to: phone,
      });

      console.log("SMS sent successfully:", message.sid);
      return true;
    } catch (error) {
      console.error("Failed to send SMS:", error);
      return false;
    }
  }

  static async sendWelcomeMessage(phone: string, name: string): Promise<void> {
    if (!this.isConfigured()) {
      console.warn("SMS service not configured. Welcome message for:", name);
      return;
    }

    try {
      await twilioClient!.messages.create({
        body: `Welcome to Yousef Recharge, ${name}! 🎉 Your fitness journey starts now. Visit your dashboard to begin your transformation.`,
        from: twilioPhoneNumber,
        to: phone,
      });
    } catch (error) {
      console.error("Failed to send welcome SMS:", error);
    }
  }

  static async sendWorkoutReminder(
    phone: string,
    workoutName: string,
  ): Promise<void> {
    if (!this.isConfigured()) return;

    try {
      await twilioClient!.messages.create({
        body: `⏰ Workout Reminder: "${workoutName}" is scheduled for today. Don't miss your fitness goal! 💪`,
        from: twilioPhoneNumber,
        to: phone,
      });
    } catch (error) {
      console.error("Failed to send workout reminder:", error);
    }
  }

  static async sendStreakCelebration(
    phone: string,
    streakDays: number,
  ): Promise<void> {
    if (!this.isConfigured()) return;

    try {
      await twilioClient!.messages.create({
        body: `🔥 Amazing! You've maintained your workout streak for ${streakDays} days! Keep up the fantastic work! 🌟`,
        from: twilioPhoneNumber,
        to: phone,
      });
    } catch (error) {
      console.error("Failed to send streak celebration:", error);
    }
  }

  // Alternative SMS service using other providers
  static async sendOTPViaAlternative(
    phone: string,
    otp: string,
  ): Promise<boolean> {
    // You can integrate with other SMS providers like:
    // - AWS SNS
    // - Vonage (Nexmo)
    // - MessageBird
    // - Local Kuwait SMS providers

    try {
      // Example with fetch API to a local SMS provider
      const response = await fetch("https://sms-api.example.com/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.SMS_API_KEY,
        },
        body: JSON.stringify({
          to: phone,
          message: `Your verification code: ${otp}`,
          from: "Yousef Recharge",
        }),
      });

      return response.ok;
    } catch (error) {
      console.error("Alternative SMS service failed:", error);
      return false;
    }
  }
}

// Utility functions
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, "");

  // Add Kuwait country code if not present
  if (cleaned.length === 8 && !cleaned.startsWith("965")) {
    return "+965" + cleaned;
  }

  // Add + if missing
  if (!phone.startsWith("+")) {
    return "+" + cleaned;
  }

  return phone;
};

export const validatePhoneNumber = (phone: string): boolean => {
  const formatted = formatPhoneNumber(phone);

  // Kuwait phone number validation
  const kuwaitPattern = /^\+965[56789]\d{7}$/;

  // International pattern (basic)
  const internationalPattern = /^\+\d{10,15}$/;

  return kuwaitPattern.test(formatted) || internationalPattern.test(formatted);
};
