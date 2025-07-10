import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";

// Import auth routes
import {
  handleRegistration,
  handleContact,
  handleSendOTP,
  handleGetProfile,
} from "./routes/auth";

// Import workout routes
import {
  createExercise,
  getExercises,
  getExercise,
  updateExercise,
  deleteExercise,
  createWorkoutTemplate,
  getWorkoutTemplates,
  getWorkoutTemplate,
  logWorkout,
  getUserWorkouts,
  updateWorkout,
  deleteWorkout,
} from "./routes/workouts";

// Import meal routes
import {
  createMealTemplate,
  getMealTemplates,
  getMealTemplate,
  updateMealTemplate,
  deleteMealTemplate,
  logMeal,
  getUserMeals,
  updateMeal,
  deleteMeal,
  getDailyNutrition,
  getWeeklyNutrition,
  setNutritionGoals,
  getNutritionGoals,
} from "./routes/meals";

// Import progress routes
import {
  logBodyMetrics,
  getBodyMetrics,
  updateBodyMetrics,
  deleteBodyMetrics,
  getProgressAnalytics,
  createAchievement,
  getUserAchievements,
  unlockAchievement,
  createGoal,
  getUserGoals,
  updateGoal,
  deleteGoal,
} from "./routes/progress";

// Import subscription routes
import {
  createSubscriptionPlan,
  getSubscriptionPlans,
  getSubscriptionPlan,
  updateSubscriptionPlan,
  createSubscription,
  getUserSubscription,
  updateSubscription,
  cancelSubscription,
  getPaymentMethods,
  addPaymentMethod,
  removePaymentMethod,
  handleStripeWebhook,
} from "./routes/subscriptions";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());

  // Raw body parser for Stripe webhooks (before JSON parsing)
  app.use("/api/webhooks/stripe", express.raw({ type: "application/json" }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check routes
  app.get("/api/ping", (_req, res) => {
    res.status(200).json({
      message: "Hello from Express server v2!",
      timestamp: new Date().toISOString(),
      status: "healthy",
    });
  });

  app.get("/api/demo", handleDemo);

  // ==========================
  // AUTH & USER ROUTES
  // ==========================
  app.post("/api/auth/register", handleRegistration);
  app.post("/api/auth/send-otp", handleSendOTP);
  app.get("/api/users/:userId", handleGetProfile);
  app.post("/api/contact", handleContact);

  // ==========================
  // EXERCISE & WORKOUT ROUTES
  // ==========================

  // Exercise CRUD
  app.post("/api/exercises", createExercise);
  app.get("/api/exercises", getExercises);
  app.get("/api/exercises/:id", getExercise);
  app.put("/api/exercises/:id", updateExercise);
  app.delete("/api/exercises/:id", deleteExercise);

  // Workout Template CRUD
  app.post("/api/workout-templates", createWorkoutTemplate);
  app.get("/api/workout-templates", getWorkoutTemplates);
  app.get("/api/workout-templates/:id", getWorkoutTemplate);

  // Workout Logging
  app.post("/api/users/:userId/workouts", logWorkout);
  app.get("/api/users/:userId/workouts", getUserWorkouts);
  app.put("/api/workouts/:id", updateWorkout);
  app.delete("/api/workouts/:id", deleteWorkout);

  // ==========================
  // MEAL & NUTRITION ROUTES
  // ==========================

  // Meal Template CRUD
  app.post("/api/meal-templates", createMealTemplate);
  app.get("/api/meal-templates", getMealTemplates);
  app.get("/api/meal-templates/:id", getMealTemplate);
  app.put("/api/meal-templates/:id", updateMealTemplate);
  app.delete("/api/meal-templates/:id", deleteMealTemplate);

  // Meal Logging
  app.post("/api/users/:userId/meals", logMeal);
  app.get("/api/users/:userId/meals", getUserMeals);
  app.put("/api/meals/:id", updateMeal);
  app.delete("/api/meals/:id", deleteMeal);

  // Nutrition Analytics
  app.get("/api/users/:userId/nutrition/daily", getDailyNutrition);
  app.get("/api/users/:userId/nutrition/weekly", getWeeklyNutrition);

  // Nutrition Goals
  app.post("/api/users/:userId/nutrition-goals", setNutritionGoals);
  app.get("/api/users/:userId/nutrition-goals", getNutritionGoals);

  // ==========================
  // PROGRESS & ANALYTICS ROUTES
  // ==========================

  // Body Metrics
  app.post("/api/users/:userId/body-metrics", logBodyMetrics);
  app.get("/api/users/:userId/body-metrics", getBodyMetrics);
  app.put("/api/body-metrics/:id", updateBodyMetrics);
  app.delete("/api/body-metrics/:id", deleteBodyMetrics);

  // Progress Analytics
  app.get("/api/users/:userId/progress/analytics", getProgressAnalytics);

  // Achievements
  app.post("/api/achievements", createAchievement);
  app.get("/api/users/:userId/achievements", getUserAchievements);
  app.post(
    "/api/users/:userId/achievements/:achievementId/unlock",
    unlockAchievement,
  );

  // Goals
  app.post("/api/users/:userId/goals", createGoal);
  app.get("/api/users/:userId/goals", getUserGoals);
  app.put("/api/goals/:id", updateGoal);
  app.delete("/api/goals/:id", deleteGoal);

  // ==========================
  // SUBSCRIPTION & PAYMENT ROUTES
  // ==========================

  // Subscription Plans
  app.post("/api/subscription-plans", createSubscriptionPlan);
  app.get("/api/subscription-plans", getSubscriptionPlans);
  app.get("/api/subscription-plans/:id", getSubscriptionPlan);
  app.put("/api/subscription-plans/:id", updateSubscriptionPlan);

  // User Subscriptions
  app.post("/api/users/:userId/subscription", createSubscription);
  app.get("/api/users/:userId/subscription", getUserSubscription);
  app.put("/api/subscriptions/:id", updateSubscription);
  app.delete("/api/subscriptions/:id", cancelSubscription);

  // Payment Methods
  app.get("/api/users/:userId/payment-methods", getPaymentMethods);
  app.post("/api/users/:userId/payment-methods", addPaymentMethod);
  app.delete("/api/payment-methods/:paymentMethodId", removePaymentMethod);

  // Stripe Webhooks
  app.post("/api/webhooks/stripe", handleStripeWebhook);

  // ==========================
  // ERROR HANDLING
  // ==========================

  // 404 handler
  app.use("*", (_req, res) => {
    res.status(404).json({
      success: false,
      message: "Endpoint not found",
    });
  });

  // Global error handler
  app.use((error: any, _req: any, res: any, _next: any) => {
    console.error("Global error:", error);

    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal server error",
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    });
  });

  return app;
}

const port = parseInt(process.env.PORT || "3000");
const server = createServer();

if (process.env.NODE_ENV !== "test") {
  // Add process error handlers
  process.on("uncaughtException", (err) => {
    console.error("❌ Uncaught Exception:", err);
    process.exit(1);
  });

  process.on("unhandledRejection", (reason, promise) => {
    console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
    process.exit(1);
  });

  server
    .listen(port, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${port}`);
      console.log(`📚 API endpoints available at /api/ping`);
      console.log(`✅ Health check: /api/ping`);
    })
    .on("error", (err) => {
      console.error("❌ Server failed to start:", err);
      process.exit(1);
    });
}

export default server;
