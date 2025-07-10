import { RequestHandler } from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Validation schemas
const bodyMetricsSchema = z.object({
  weight: z.number().min(20, "Weight must be at least 20kg").optional(),
  bodyFat: z
    .number()
    .min(0)
    .max(100, "Body fat must be between 0-100%")
    .optional(),
  muscleMass: z.number().min(0).optional(),
  measurements: z
    .object({
      chest: z.number().min(0).optional(),
      waist: z.number().min(0).optional(),
      hips: z.number().min(0).optional(),
      arms: z.number().min(0).optional(),
      thighs: z.number().min(0).optional(),
      neck: z.number().min(0).optional(),
    })
    .optional(),
  photos: z
    .object({
      front: z.string().optional(),
      side: z.string().optional(),
      back: z.string().optional(),
    })
    .optional(),
  notes: z.string().optional(),
  date: z.string().optional(),
});

const achievementSchema = z.object({
  name: z.string().min(1, "Achievement name is required"),
  description: z.string().min(1, "Achievement description is required"),
  icon: z.string().optional(),
  category: z.enum(["workout", "nutrition", "consistency", "milestone"]),
  requirement: z.object({
    type: z.enum(["count", "streak", "total", "target"]),
    value: z.number().min(1),
    metric: z.string(),
  }),
  points: z.number().min(1).default(10),
});

const goalSchema = z.object({
  type: z.enum([
    "weight_loss",
    "weight_gain",
    "muscle_gain",
    "strength",
    "endurance",
    "custom",
  ]),
  title: z.string().min(1, "Goal title is required"),
  description: z.string().optional(),
  targetValue: z.number().optional(),
  currentValue: z.number().optional(),
  unit: z.string().optional(),
  targetDate: z.string().optional(),
  isCompleted: z.boolean().default(false),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
});

// Body Metrics CRUD
export const logBodyMetrics: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const validatedData = bodyMetricsSchema.parse(req.body);

    const bodyMetrics = await prisma.progress.create({
      data: {
        ...validatedData,
        userId,
        date: validatedData.date ? new Date(validatedData.date) : new Date(),
        type: "body_metrics",
      },
    });

    res.status(201).json({ success: true, data: bodyMetrics });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    console.error("Log body metrics error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to log body metrics",
    });
  }
};

export const getBodyMetrics: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate, limit = 50, offset = 0 } = req.query;

    const where: any = {
      userId,
      type: "body_metrics",
    };

    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate as string);
      if (endDate) where.date.lte = new Date(endDate as string);
    }

    const metrics = await prisma.progress.findMany({
      where,
      take: parseInt(limit as string),
      skip: parseInt(offset as string),
      orderBy: { date: "desc" },
    });

    const total = await prisma.progress.count({ where });

    res.json({
      success: true,
      data: metrics,
      pagination: {
        total,
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
      },
    });
  } catch (error) {
    console.error("Get body metrics error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch body metrics",
    });
  }
};

export const updateBodyMetrics: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = bodyMetricsSchema.partial().parse(req.body);

    const bodyMetrics = await prisma.progress.update({
      where: { id },
      data: validatedData,
    });

    res.json({ success: true, data: bodyMetrics });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    console.error("Update body metrics error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update body metrics",
    });
  }
};

export const deleteBodyMetrics: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.progress.delete({
      where: { id },
    });

    res.json({ success: true, message: "Body metrics deleted successfully" });
  } catch (error) {
    console.error("Delete body metrics error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete body metrics",
    });
  }
};

// Progress Analytics
export const getProgressAnalytics: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const { period = "30" } = req.query; // days

    const days = parseInt(period as string);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get workout analytics
    const workouts = await prisma.workout.findMany({
      where: {
        userId,
        date: { gte: startDate },
      },
      orderBy: { date: "asc" },
    });

    // Get meal analytics
    const meals = await prisma.meal.findMany({
      where: {
        userId,
        date: { gte: startDate },
      },
      orderBy: { date: "asc" },
    });

    // Get body metrics
    const bodyMetrics = await prisma.progress.findMany({
      where: {
        userId,
        type: "body_metrics",
        date: { gte: startDate },
      },
      orderBy: { date: "asc" },
    });

    // Calculate analytics
    const workoutAnalytics = {
      totalWorkouts: workouts.length,
      totalDuration: workouts.reduce((sum, w) => sum + w.duration, 0),
      totalCaloriesBurned: workouts.reduce(
        (sum, w) => sum + w.totalCalories,
        0,
      ),
      avgRating:
        workouts.length > 0
          ? workouts.reduce((sum, w) => sum + (w.rating || 0), 0) /
            workouts.length
          : 0,
      workoutsByDay: {},
    };

    const nutritionAnalytics = {
      totalMeals: meals.length,
      avgDailyCalories: 0,
      avgDailyProtein: 0,
      avgDailyCarbs: 0,
      avgDailyFat: 0,
      mealsByType: { breakfast: 0, lunch: 0, dinner: 0, snack: 0 },
    };

    // Group nutrition by day for averages
    const dailyNutrition: Record<string, any> = {};
    meals.forEach((meal) => {
      const dayKey = meal.date.toISOString().split("T")[0];
      if (!dailyNutrition[dayKey]) {
        dailyNutrition[dayKey] = { calories: 0, protein: 0, carbs: 0, fat: 0 };
      }
      const nutrition = meal.nutrition as any;
      dailyNutrition[dayKey].calories += nutrition.calories * meal.servings;
      dailyNutrition[dayKey].protein += nutrition.protein * meal.servings;
      dailyNutrition[dayKey].carbs += nutrition.carbs * meal.servings;
      dailyNutrition[dayKey].fat += nutrition.fat * meal.servings;

      nutritionAnalytics.mealsByType[meal.mealType]++;
    });

    const daysWithMeals = Object.keys(dailyNutrition).length;
    if (daysWithMeals > 0) {
      const totals = Object.values(dailyNutrition).reduce(
        (acc: any, day: any) => ({
          calories: acc.calories + day.calories,
          protein: acc.protein + day.protein,
          carbs: acc.carbs + day.carbs,
          fat: acc.fat + day.fat,
        }),
        { calories: 0, protein: 0, carbs: 0, fat: 0 },
      );

      nutritionAnalytics.avgDailyCalories = totals.calories / daysWithMeals;
      nutritionAnalytics.avgDailyProtein = totals.protein / daysWithMeals;
      nutritionAnalytics.avgDailyCarbs = totals.carbs / daysWithMeals;
      nutritionAnalytics.avgDailyFat = totals.fat / daysWithMeals;
    }

    // Body metrics trends
    const progressTrends = {
      weightTrend: calculateTrend(bodyMetrics, "weight"),
      bodyFatTrend: calculateTrend(bodyMetrics, "bodyFat"),
      muscleMassTrend: calculateTrend(bodyMetrics, "muscleMass"),
      latestMetrics: bodyMetrics[bodyMetrics.length - 1] || null,
    };

    res.json({
      success: true,
      data: {
        period: days,
        workoutAnalytics,
        nutritionAnalytics,
        progressTrends,
        consistency: {
          workoutDays: new Set(
            workouts.map((w) => w.date.toISOString().split("T")[0]),
          ).size,
          mealLoggingDays: new Set(
            meals.map((m) => m.date.toISOString().split("T")[0]),
          ).size,
          totalDays: days,
        },
      },
    });
  } catch (error) {
    console.error("Get progress analytics error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch progress analytics",
    });
  }
};

// Helper function to calculate trends
function calculateTrend(metrics: any[], field: string) {
  const values = metrics
    .map((m) => m[field])
    .filter((v) => v !== null && v !== undefined)
    .map((v) => parseFloat(v));

  if (values.length < 2)
    return { trend: "stable", change: 0, percentChange: 0 };

  const first = values[0];
  const last = values[values.length - 1];
  const change = last - first;
  const percentChange = (change / first) * 100;

  let trend = "stable";
  if (Math.abs(percentChange) > 2) {
    trend = change > 0 ? "increasing" : "decreasing";
  }

  return { trend, change, percentChange };
}

// Achievements System
export const createAchievement: RequestHandler = async (req, res) => {
  try {
    const validatedData = achievementSchema.parse(req.body);

    const achievement = await prisma.achievement.create({
      data: validatedData,
    });

    res.status(201).json({ success: true, data: achievement });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    console.error("Create achievement error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create achievement",
    });
  }
};

export const getUserAchievements: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;

    // Get all achievements with user progress
    const achievements = await prisma.achievement.findMany({
      include: {
        userAchievements: {
          where: { userId },
        },
      },
      orderBy: { points: "desc" },
    });

    const formattedAchievements = achievements.map((achievement) => ({
      ...achievement,
      isUnlocked: achievement.userAchievements.length > 0,
      unlockedAt: achievement.userAchievements[0]?.unlockedAt || null,
      progress: calculateAchievementProgress(achievement, userId),
    }));

    res.json({ success: true, data: formattedAchievements });
  } catch (error) {
    console.error("Get user achievements error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user achievements",
    });
  }
};

export const unlockAchievement: RequestHandler = async (req, res) => {
  try {
    const { userId, achievementId } = req.params;

    // Check if already unlocked
    const existing = await prisma.userAchievement.findUnique({
      where: {
        userId_achievementId: { userId, achievementId },
      },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Achievement already unlocked",
      });
    }

    const userAchievement = await prisma.userAchievement.create({
      data: {
        userId,
        achievementId,
        unlockedAt: new Date(),
      },
      include: {
        achievement: true,
      },
    });

    res.json({ success: true, data: userAchievement });
  } catch (error) {
    console.error("Unlock achievement error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to unlock achievement",
    });
  }
};

// Helper function for achievement progress (simplified)
function calculateAchievementProgress(
  achievement: any,
  userId: string,
): number {
  // This would be more complex in a real implementation
  // For now, return a mock progress value
  return Math.floor(Math.random() * 100);
}

// Goals System
export const createGoal: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const validatedData = goalSchema.parse(req.body);

    const goal = await prisma.goal.create({
      data: {
        ...validatedData,
        userId,
        targetDate: validatedData.targetDate
          ? new Date(validatedData.targetDate)
          : null,
      },
    });

    res.status(201).json({ success: true, data: goal });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    console.error("Create goal error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create goal",
    });
  }
};

export const getUserGoals: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const { isCompleted, type } = req.query;

    const where: any = { userId };
    if (isCompleted !== undefined) where.isCompleted = isCompleted === "true";
    if (type) where.type = type;

    const goals = await prisma.goal.findMany({
      where,
      orderBy: [
        { isCompleted: "asc" },
        { priority: "desc" },
        { createdAt: "desc" },
      ],
    });

    res.json({ success: true, data: goals });
  } catch (error) {
    console.error("Get user goals error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user goals",
    });
  }
};

export const updateGoal: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = goalSchema.partial().parse(req.body);

    const goal = await prisma.goal.update({
      where: { id },
      data: {
        ...validatedData,
        targetDate: validatedData.targetDate
          ? new Date(validatedData.targetDate)
          : undefined,
      },
    });

    res.json({ success: true, data: goal });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    console.error("Update goal error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update goal",
    });
  }
};

export const deleteGoal: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.goal.delete({
      where: { id },
    });

    res.json({ success: true, message: "Goal deleted successfully" });
  } catch (error) {
    console.error("Delete goal error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete goal",
    });
  }
};
