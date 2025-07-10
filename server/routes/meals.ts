import { RequestHandler } from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Validation schemas
const mealTemplateSchema = z.object({
  name: z.string().min(1, "Meal name is required"),
  description: z.string().optional(),
  category: z.enum(["breakfast", "lunch", "dinner", "snack"]),
  prepTime: z.number().min(0, "Prep time must be positive"),
  servings: z.number().min(1, "Servings must be at least 1"),
  nutrition: z.object({
    calories: z.number().min(0),
    protein: z.number().min(0),
    carbs: z.number().min(0),
    fat: z.number().min(0),
    fiber: z.number().min(0),
    sugar: z.number().min(0),
  }),
  ingredients: z.array(
    z.object({
      name: z.string(),
      amount: z.number(),
      unit: z.string(),
    }),
  ),
  instructions: z.array(z.string()),
  tags: z.array(z.string()).optional(),
});

const mealLogSchema = z.object({
  mealType: z.enum(["breakfast", "lunch", "dinner", "snack"]),
  mealTemplateId: z.string().optional(),
  mealName: z.string().min(1, "Meal name is required"),
  servings: z.number().min(0.1, "Servings must be positive").default(1),
  nutrition: z.object({
    calories: z.number().min(0),
    protein: z.number().min(0),
    carbs: z.number().min(0),
    fat: z.number().min(0),
    fiber: z.number().min(0),
    sugar: z.number().min(0),
  }),
  notes: z.string().optional(),
  date: z.string().optional(),
});

const nutritionGoalSchema = z.object({
  dailyCalories: z.number().min(800, "Daily calories too low"),
  dailyProtein: z.number().min(0),
  dailyCarbs: z.number().min(0),
  dailyFat: z.number().min(0),
  dailyFiber: z.number().min(0),
  waterGoal: z.number().min(0).optional(),
});

// Meal Template CRUD operations
export const createMealTemplate: RequestHandler = async (req, res) => {
  try {
    const validatedData = mealTemplateSchema.parse(req.body);

    const mealTemplate = await prisma.mealTemplate.create({
      data: validatedData,
    });

    res.status(201).json({ success: true, data: mealTemplate });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    console.error("Create meal template error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create meal template",
    });
  }
};

export const getMealTemplates: RequestHandler = async (req, res) => {
  try {
    const {
      category,
      maxCalories,
      maxPrepTime,
      limit = 20,
      offset = 0,
    } = req.query;

    const where: any = {};
    if (category) where.category = category;
    if (maxCalories)
      where.nutrition = {
        path: ["calories"],
        lte: parseInt(maxCalories as string),
      };
    if (maxPrepTime) where.prepTime = { lte: parseInt(maxPrepTime as string) };

    const mealTemplates = await prisma.mealTemplate.findMany({
      where,
      take: parseInt(limit as string),
      skip: parseInt(offset as string),
      orderBy: { name: "asc" },
    });

    const total = await prisma.mealTemplate.count({ where });

    res.json({
      success: true,
      data: mealTemplates,
      pagination: {
        total,
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
      },
    });
  } catch (error) {
    console.error("Get meal templates error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch meal templates",
    });
  }
};

export const getMealTemplate: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const mealTemplate = await prisma.mealTemplate.findUnique({
      where: { id },
    });

    if (!mealTemplate) {
      return res.status(404).json({
        success: false,
        message: "Meal template not found",
      });
    }

    res.json({ success: true, data: mealTemplate });
  } catch (error) {
    console.error("Get meal template error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch meal template",
    });
  }
};

export const updateMealTemplate: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = mealTemplateSchema.partial().parse(req.body);

    const mealTemplate = await prisma.mealTemplate.update({
      where: { id },
      data: validatedData,
    });

    res.json({ success: true, data: mealTemplate });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    console.error("Update meal template error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update meal template",
    });
  }
};

export const deleteMealTemplate: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.mealTemplate.delete({
      where: { id },
    });

    res.json({ success: true, message: "Meal template deleted successfully" });
  } catch (error) {
    console.error("Delete meal template error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete meal template",
    });
  }
};

// Meal Logging
export const logMeal: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.userId || req.body.userId;
    const validatedData = mealLogSchema.parse(req.body);

    const meal = await prisma.meal.create({
      data: {
        ...validatedData,
        userId,
        date: validatedData.date ? new Date(validatedData.date) : new Date(),
      },
    });

    res.status(201).json({ success: true, data: meal });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    console.error("Log meal error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to log meal",
    });
  }
};

export const getUserMeals: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate, mealType, limit = 50, offset = 0 } = req.query;

    const where: any = { userId };
    if (mealType) where.mealType = mealType;
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate as string);
      if (endDate) where.date.lte = new Date(endDate as string);
    }

    const meals = await prisma.meal.findMany({
      where,
      take: parseInt(limit as string),
      skip: parseInt(offset as string),
      orderBy: { date: "desc" },
    });

    const total = await prisma.meal.count({ where });

    res.json({
      success: true,
      data: meals,
      pagination: {
        total,
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
      },
    });
  } catch (error) {
    console.error("Get user meals error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user meals",
    });
  }
};

export const updateMeal: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = mealLogSchema.partial().parse(req.body);

    const meal = await prisma.meal.update({
      where: { id },
      data: validatedData,
    });

    res.json({ success: true, data: meal });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    console.error("Update meal error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update meal",
    });
  }
};

export const deleteMeal: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.meal.delete({
      where: { id },
    });

    res.json({ success: true, message: "Meal deleted successfully" });
  } catch (error) {
    console.error("Delete meal error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete meal",
    });
  }
};

// Nutrition Analytics
export const getDailyNutrition: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const { date = new Date().toISOString().split("T")[0] } = req.query;

    const startDate = new Date(date as string);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    const meals = await prisma.meal.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
    });

    const totalNutrition = meals.reduce(
      (total, meal) => ({
        calories:
          total.calories + (meal.nutrition as any).calories * meal.servings,
        protein:
          total.protein + (meal.nutrition as any).protein * meal.servings,
        carbs: total.carbs + (meal.nutrition as any).carbs * meal.servings,
        fat: total.fat + (meal.nutrition as any).fat * meal.servings,
        fiber: total.fiber + (meal.nutrition as any).fiber * meal.servings,
        sugar: total.sugar + (meal.nutrition as any).sugar * meal.servings,
      }),
      {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        sugar: 0,
      },
    );

    const mealsByType = meals.reduce(
      (acc, meal) => {
        if (!acc[meal.mealType]) acc[meal.mealType] = [];
        acc[meal.mealType].push(meal);
        return acc;
      },
      {} as Record<string, any[]>,
    );

    res.json({
      success: true,
      data: {
        date,
        totalNutrition,
        mealsByType,
        mealCount: meals.length,
      },
    });
  } catch (error) {
    console.error("Get daily nutrition error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch daily nutrition",
    });
  }
};

export const getWeeklyNutrition: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const { startDate } = req.query;

    const start = startDate ? new Date(startDate as string) : new Date();
    start.setDate(start.getDate() - start.getDay()); // Start of week

    const end = new Date(start);
    end.setDate(end.getDate() + 7);

    const meals = await prisma.meal.findMany({
      where: {
        userId,
        date: {
          gte: start,
          lt: end,
        },
      },
      orderBy: { date: "asc" },
    });

    const dailyNutrition = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      const dayString = day.toISOString().split("T")[0];

      const dayMeals = meals.filter(
        (meal) => meal.date.toISOString().split("T")[0] === dayString,
      );

      const nutrition = dayMeals.reduce(
        (total, meal) => ({
          calories:
            total.calories + (meal.nutrition as any).calories * meal.servings,
          protein:
            total.protein + (meal.nutrition as any).protein * meal.servings,
          carbs: total.carbs + (meal.nutrition as any).carbs * meal.servings,
          fat: total.fat + (meal.nutrition as any).fat * meal.servings,
        }),
        { calories: 0, protein: 0, carbs: 0, fat: 0 },
      );

      return {
        date: dayString,
        dayOfWeek: day.toLocaleDateString("en-US", { weekday: "long" }),
        nutrition,
        mealCount: dayMeals.length,
      };
    });

    res.json({
      success: true,
      data: {
        weekStart: start.toISOString().split("T")[0],
        weekEnd: end.toISOString().split("T")[0],
        dailyNutrition,
      },
    });
  } catch (error) {
    console.error("Get weekly nutrition error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch weekly nutrition",
    });
  }
};

// Nutrition Goals
export const setNutritionGoals: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const validatedData = nutritionGoalSchema.parse(req.body);

    const goals = await prisma.nutritionGoal.upsert({
      where: { userId },
      update: validatedData,
      create: {
        ...validatedData,
        userId,
      },
    });

    res.json({ success: true, data: goals });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    console.error("Set nutrition goals error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to set nutrition goals",
    });
  }
};

export const getNutritionGoals: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;

    const goals = await prisma.nutritionGoal.findUnique({
      where: { userId },
    });

    res.json({ success: true, data: goals });
  } catch (error) {
    console.error("Get nutrition goals error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch nutrition goals",
    });
  }
};
