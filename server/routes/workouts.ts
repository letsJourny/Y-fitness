import { RequestHandler } from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Validation schemas
const workoutSchema = z.object({
  name: z.string().min(1, "Workout name is required"),
  description: z.string().optional(),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  category: z.enum(["strength", "cardio", "flexibility", "hiit", "sports"]),
  exercises: z.array(
    z.object({
      exerciseId: z.string(),
      sets: z.number().optional(),
      reps: z.number().optional(),
      duration: z.number().optional(),
      weight: z.number().optional(),
      restTime: z.number().optional(),
      notes: z.string().optional(),
    }),
  ),
  totalCalories: z.number().min(0),
  tags: z.array(z.string()).optional(),
});

const exerciseSchema = z.object({
  name: z.string().min(1, "Exercise name is required"),
  description: z.string().optional(),
  category: z.enum(["strength", "cardio", "flexibility", "sports"]),
  muscleGroups: z.array(z.string()),
  equipment: z.array(z.string()),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  instructions: z.array(z.string()),
  tips: z.array(z.string()).optional(),
});

const workoutLogSchema = z.object({
  workoutTemplateId: z.string().optional(),
  workoutName: z.string().min(1, "Workout name is required"),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
  exercises: z.array(
    z.object({
      exerciseId: z.string(),
      exerciseName: z.string(),
      sets: z.array(
        z.object({
          reps: z.number().optional(),
          weight: z.number().optional(),
          duration: z.number().optional(),
          restTime: z.number().optional(),
          completed: z.boolean(),
        }),
      ),
    }),
  ),
  totalCalories: z.number().min(0),
  notes: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
});

// Exercise CRUD operations
export const createExercise: RequestHandler = async (req, res) => {
  try {
    const validatedData = exerciseSchema.parse(req.body);

    const exercise = await prisma.exercise.create({
      data: validatedData,
    });

    res.status(201).json({ success: true, data: exercise });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    console.error("Create exercise error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create exercise",
    });
  }
};

export const getExercises: RequestHandler = async (req, res) => {
  try {
    const {
      category,
      difficulty,
      muscleGroup,
      limit = 50,
      offset = 0,
    } = req.query;

    const where: any = {};
    if (category) where.category = category;
    if (difficulty) where.difficulty = difficulty;
    if (muscleGroup) where.muscleGroups = { has: muscleGroup };

    const exercises = await prisma.exercise.findMany({
      where,
      take: parseInt(limit as string),
      skip: parseInt(offset as string),
      orderBy: { name: "asc" },
    });

    const total = await prisma.exercise.count({ where });

    res.json({
      success: true,
      data: exercises,
      pagination: {
        total,
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
      },
    });
  } catch (error) {
    console.error("Get exercises error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch exercises",
    });
  }
};

export const getExercise: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const exercise = await prisma.exercise.findUnique({
      where: { id },
    });

    if (!exercise) {
      return res.status(404).json({
        success: false,
        message: "Exercise not found",
      });
    }

    res.json({ success: true, data: exercise });
  } catch (error) {
    console.error("Get exercise error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch exercise",
    });
  }
};

export const updateExercise: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = exerciseSchema.partial().parse(req.body);

    const exercise = await prisma.exercise.update({
      where: { id },
      data: validatedData,
    });

    res.json({ success: true, data: exercise });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    console.error("Update exercise error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update exercise",
    });
  }
};

export const deleteExercise: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.exercise.delete({
      where: { id },
    });

    res.json({ success: true, message: "Exercise deleted successfully" });
  } catch (error) {
    console.error("Delete exercise error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete exercise",
    });
  }
};

// Workout Template CRUD operations
export const createWorkoutTemplate: RequestHandler = async (req, res) => {
  try {
    const validatedData = workoutSchema.parse(req.body);

    const workout = await prisma.workoutTemplate.create({
      data: validatedData,
    });

    res.status(201).json({ success: true, data: workout });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    console.error("Create workout template error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create workout template",
    });
  }
};

export const getWorkoutTemplates: RequestHandler = async (req, res) => {
  try {
    const { category, difficulty, limit = 20, offset = 0 } = req.query;

    const where: any = {};
    if (category) where.category = category;
    if (difficulty) where.difficulty = difficulty;

    const workouts = await prisma.workoutTemplate.findMany({
      where,
      take: parseInt(limit as string),
      skip: parseInt(offset as string),
      orderBy: { name: "asc" },
    });

    const total = await prisma.workoutTemplate.count({ where });

    res.json({
      success: true,
      data: workouts,
      pagination: {
        total,
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
      },
    });
  } catch (error) {
    console.error("Get workout templates error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch workout templates",
    });
  }
};

export const getWorkoutTemplate: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const workout = await prisma.workoutTemplate.findUnique({
      where: { id },
    });

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: "Workout template not found",
      });
    }

    res.json({ success: true, data: workout });
  } catch (error) {
    console.error("Get workout template error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch workout template",
    });
  }
};

// Workout Logging
export const logWorkout: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.userId || req.body.userId;
    const validatedData = workoutLogSchema.parse(req.body);

    const workout = await prisma.workout.create({
      data: {
        ...validatedData,
        userId,
        date: new Date(),
      },
    });

    res.status(201).json({ success: true, data: workout });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    console.error("Log workout error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to log workout",
    });
  }
};

export const getUserWorkouts: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate, limit = 20, offset = 0 } = req.query;

    const where: any = { userId };
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate as string);
      if (endDate) where.date.lte = new Date(endDate as string);
    }

    const workouts = await prisma.workout.findMany({
      where,
      take: parseInt(limit as string),
      skip: parseInt(offset as string),
      orderBy: { date: "desc" },
    });

    const total = await prisma.workout.count({ where });

    res.json({
      success: true,
      data: workouts,
      pagination: {
        total,
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
      },
    });
  } catch (error) {
    console.error("Get user workouts error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user workouts",
    });
  }
};

export const updateWorkout: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = workoutLogSchema.partial().parse(req.body);

    const workout = await prisma.workout.update({
      where: { id },
      data: validatedData,
    });

    res.json({ success: true, data: workout });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    console.error("Update workout error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update workout",
    });
  }
};

export const deleteWorkout: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.workout.delete({
      where: { id },
    });

    res.json({ success: true, message: "Workout deleted successfully" });
  } catch (error) {
    console.error("Delete workout error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete workout",
    });
  }
};
