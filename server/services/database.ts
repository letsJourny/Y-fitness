import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Initialize Prisma client
const prisma = new PrismaClient();

// JWT secret (should be in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key";

export class DatabaseService {
  // User operations
  static async createUser(userData: {
    email: string;
    fullName: string;
    age: number;
    weight: number;
    gender: "MALE" | "FEMALE" | "OTHER";
    goal: "LOSE_WEIGHT" | "GAIN_MUSCLE" | "MAINTAIN";
    phone?: string;
    password?: string;
    authMethod: "EMAIL" | "OTP";
  }) {
    const hashedPassword = userData.password
      ? await bcrypt.hash(userData.password, 12)
      : undefined;

    return await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        age: true,
        weight: true,
        gender: true,
        goal: true,
        phone: true,
        isVerified: true,
        createdAt: true,
      },
    });
  }

  static async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  static async findUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        fullName: true,
        age: true,
        weight: true,
        gender: true,
        goal: true,
        phone: true,
        isVerified: true,
        createdAt: true,
      },
    });
  }

  static async verifyUser(id: string) {
    return await prisma.user.update({
      where: { id },
      data: { isVerified: true },
    });
  }

  // Session operations
  static async createSession(userId: string) {
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    const session = await prisma.session.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });

    return { token, session };
  }

  static async validateSession(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

      const session = await prisma.session.findUnique({
        where: { token },
        include: { user: true },
      });

      if (!session || session.expiresAt < new Date()) {
        return null;
      }

      return session;
    } catch {
      return null;
    }
  }

  static async deleteSession(token: string) {
    await prisma.session.delete({
      where: { token },
    });
  }

  // OTP operations
  static async createOTP(phone: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Delete existing OTPs for this phone
    await prisma.oTPVerification.deleteMany({
      where: { phone },
    });

    await prisma.oTPVerification.create({
      data: {
        phone,
        otp,
        expiresAt,
      },
    });

    return otp;
  }

  static async verifyOTP(phone: string, otp: string) {
    const verification = await prisma.oTPVerification.findFirst({
      where: {
        phone,
        otp,
        verified: false,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (verification) {
      await prisma.oTPVerification.update({
        where: { id: verification.id },
        data: { verified: true },
      });
      return true;
    }

    return false;
  }

  // Contact operations
  static async createContact(contactData: {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
  }) {
    return await prisma.contact.create({
      data: contactData,
    });
  }

  // Workout operations
  static async createWorkout(userId: string, workoutData: any) {
    return await prisma.workout.create({
      data: {
        userId,
        ...workoutData,
      },
    });
  }

  static async getUserWorkouts(userId: string, limit = 10) {
    return await prisma.workout.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }

  // Meal operations
  static async createMeal(userId: string, mealData: any) {
    return await prisma.meal.create({
      data: {
        userId,
        ...mealData,
      },
    });
  }

  static async getUserMeals(userId: string, date?: Date) {
    const startOfDay = date ? new Date(date.setHours(0, 0, 0, 0)) : new Date();
    const endOfDay = date
      ? new Date(date.setHours(23, 59, 59, 999))
      : new Date();

    return await prisma.meal.findMany({
      where: {
        userId,
        consumedAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: { consumedAt: "asc" },
    });
  }

  // Progress operations
  static async createProgress(userId: string, progressData: any) {
    return await prisma.progress.create({
      data: {
        userId,
        ...progressData,
      },
    });
  }

  static async getUserProgress(userId: string, limit = 30) {
    return await prisma.progress.findMany({
      where: { userId },
      orderBy: { recordedAt: "desc" },
      take: limit,
    });
  }

  // Subscription operations
  static async createSubscription(userId: string, subscriptionData: any) {
    return await prisma.subscription.upsert({
      where: { userId },
      update: subscriptionData,
      create: {
        userId,
        ...subscriptionData,
      },
    });
  }

  static async getUserSubscription(userId: string) {
    return await prisma.subscription.findUnique({
      where: { userId },
    });
  }

  // Push notification subscriptions
  static async savePushSubscription(userId: string, subscription: any) {
    return await prisma.pushSubscription.upsert({
      where: {
        userId_endpoint: {
          userId,
          endpoint: subscription.endpoint,
        },
      },
      update: {
        keys: subscription.keys,
      },
      create: {
        userId,
        endpoint: subscription.endpoint,
        keys: subscription.keys,
      },
    });
  }

  static async getUserPushSubscriptions(userId: string) {
    return await prisma.pushSubscription.findMany({
      where: { userId },
    });
  }

  // Admin operations
  static async getAllUsers(page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          email: true,
          fullName: true,
          age: true,
          weight: true,
          gender: true,
          goal: true,
          isVerified: true,
          createdAt: true,
          subscription: {
            select: {
              plan: true,
              status: true,
            },
          },
        },
      }),
      prisma.user.count(),
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  static async getDashboardStats() {
    const [userCount, activeSubscriptions, totalWorkouts, totalMeals] =
      await Promise.all([
        prisma.user.count(),
        prisma.subscription.count({
          where: { status: "ACTIVE" },
        }),
        prisma.workout.count(),
        prisma.meal.count(),
      ]);

    return {
      userCount,
      activeSubscriptions,
      totalWorkouts,
      totalMeals,
    };
  }

  // Cleanup and maintenance
  static async cleanupExpiredSessions() {
    await prisma.session.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }

  static async cleanupExpiredOTPs() {
    await prisma.oTPVerification.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }
}

export { prisma };
