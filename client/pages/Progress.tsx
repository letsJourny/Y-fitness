import Navigation from "@/components/Navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BarChart3,
  Calendar,
  TrendingUp,
  Target,
  Plus,
  Dumbbell,
  Utensils,
  Activity,
  Award,
  Camera,
  Scale,
} from "lucide-react";
import { useState } from "react";
import {
  sampleWorkoutLogs,
  sampleMealLogs,
  sampleBodyMetrics,
  achievements,
  WorkoutLog,
  MealLog,
  BodyMetrics,
} from "@/utils/progressUtils";
import WorkoutLogger from "@/components/progress/WorkoutLogger";
import MealLogger from "@/components/progress/MealLogger";
import ProgressAnalytics from "@/components/progress/ProgressAnalytics";

export default function Progress() {
  const [workoutLogs, setWorkoutLogs] =
    useState<WorkoutLog[]>(sampleWorkoutLogs);
  const [mealLogs, setMealLogs] = useState<MealLog[]>(sampleMealLogs);
  const [bodyMetrics, setBodyMetrics] =
    useState<BodyMetrics[]>(sampleBodyMetrics);
  const [showWorkoutLogger, setShowWorkoutLogger] = useState(false);
  const [showMealLogger, setShowMealLogger] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const handleSaveWorkout = (workoutLog: WorkoutLog) => {
    setWorkoutLogs((prev) => [workoutLog, ...prev]);
    setShowWorkoutLogger(false);

    const event = new CustomEvent("showToast", {
      detail: {
        message: "Workout logged successfully! 🎯",
        type: "success",
      },
    });
    window.dispatchEvent(event);
  };

  const handleSaveMeal = (mealLog: MealLog) => {
    setMealLogs((prev) => [mealLog, ...prev]);
    setShowMealLogger(false);

    const event = new CustomEvent("showToast", {
      detail: {
        message: "Meal logged successfully! 🍽️",
        type: "success",
      },
    });
    window.dispatchEvent(event);
  };

  const todaysWorkouts = workoutLogs.filter(
    (log) => log.date === new Date().toISOString().split("T")[0],
  );

  const todaysMeals = mealLogs.filter(
    (log) => log.date === new Date().toISOString().split("T")[0],
  );

  const todaysCalories = {
    burned: todaysWorkouts.reduce((sum, log) => sum + log.totalCalories, 0),
    consumed: todaysMeals.reduce((sum, log) => sum + log.nutrition.calories, 0),
  };

  const weeklyGoals = {
    workouts: { target: 4, current: workoutLogs.length },
    calories: { target: 2000, current: todaysCalories.burned },
    meals: { target: 21, current: mealLogs.length },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Logging & Progress
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track your fitness journey with detailed workout and meal logging,
            comprehensive analytics, and progress insights
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Today's Calories
                  </p>
                  <div className="text-2xl font-bold text-primary">
                    {todaysCalories.burned}
                  </div>
                  <p className="text-xs text-muted-foreground">Burned</p>
                </div>
                <Activity className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Food Logged
                  </p>
                  <div className="text-2xl font-bold text-green-600">
                    {todaysCalories.consumed}
                  </div>
                  <p className="text-xs text-muted-foreground">Calories</p>
                </div>
                <Utensils className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    This Week
                  </p>
                  <div className="text-2xl font-bold text-orange-600">
                    {weeklyGoals.workouts.current}/{weeklyGoals.workouts.target}
                  </div>
                  <p className="text-xs text-muted-foreground">Workouts</p>
                </div>
                <Dumbbell className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Achievements
                  </p>
                  <div className="text-2xl font-bold text-yellow-600">
                    {achievements.filter((a) => a.unlockedAt).length}
                  </div>
                  <p className="text-xs text-muted-foreground">Unlocked</p>
                </div>
                <Award className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Log your activities and track your progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Dialog
                open={showWorkoutLogger}
                onOpenChange={setShowWorkoutLogger}
              >
                <DialogTrigger asChild>
                  <Button className="h-20 flex-col gap-2">
                    <Dumbbell className="w-6 h-6" />
                    Log Workout
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Log Your Workout</DialogTitle>
                    <DialogDescription>
                      Track your exercises, sets, reps, and weights
                    </DialogDescription>
                  </DialogHeader>
                  <WorkoutLogger
                    onSave={handleSaveWorkout}
                    onCancel={() => setShowWorkoutLogger(false)}
                  />
                </DialogContent>
              </Dialog>

              <Dialog open={showMealLogger} onOpenChange={setShowMealLogger}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Utensils className="w-6 h-6" />
                    Log Meal
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Log Your Meal</DialogTitle>
                    <DialogDescription>
                      Track your food intake and nutritional information
                    </DialogDescription>
                  </DialogHeader>
                  <MealLogger
                    onSave={handleSaveMeal}
                    onCancel={() => setShowMealLogger(false)}
                  />
                </DialogContent>
              </Dialog>

              <Button
                variant="outline"
                className="h-20 flex-col gap-2"
                onClick={() => {
                  const event = new CustomEvent("showToast", {
                    detail: {
                      message: "Body metrics feature coming soon!",
                      type: "info",
                    },
                  });
                  window.dispatchEvent(event);
                }}
              >
                <Scale className="w-6 h-6" />
                Body Metrics
              </Button>

              <Button
                variant="outline"
                className="h-20 flex-col gap-2"
                onClick={() => {
                  const event = new CustomEvent("showToast", {
                    detail: {
                      message: "Progress photos feature coming soon!",
                      type: "info",
                    },
                  });
                  window.dispatchEvent(event);
                }}
              >
                <Camera className="w-6 h-6" />
                Progress Photos
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="workouts" className="flex items-center gap-2">
              <Dumbbell className="w-4 h-4" />
              Workouts ({workoutLogs.length})
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="flex items-center gap-2">
              <Utensils className="w-4 h-4" />
              Nutrition ({mealLogs.length})
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Goals
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <ProgressAnalytics
              workoutLogs={workoutLogs}
              mealLogs={mealLogs}
              bodyMetrics={bodyMetrics}
              achievements={achievements}
            />
          </TabsContent>

          {/* Workouts Tab */}
          <TabsContent value="workouts" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Workout History</h2>
                <p className="text-muted-foreground">
                  Review your past workouts and track improvements
                </p>
              </div>
              <Button onClick={() => setShowWorkoutLogger(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Log Workout
              </Button>
            </div>

            {workoutLogs.length > 0 ? (
              <div className="space-y-4">
                {workoutLogs.map((workout) => (
                  <Card key={workout.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            {workout.workoutName}
                          </CardTitle>
                          <CardDescription>
                            {new Date(workout.date).toLocaleDateString()} •{" "}
                            {workout.duration} minutes •{" "}
                            {workout.exercises.length} exercises
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            {workout.totalCalories}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            calories
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {workout.exercises.map((exercise, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-muted/30 rounded"
                          >
                            <span className="font-medium">
                              {exercise.exerciseName}
                            </span>
                            <span className="text-muted-foreground">
                              {exercise.sets.length} sets completed
                            </span>
                          </div>
                        ))}
                      </div>
                      {workout.notes && (
                        <div className="mt-4 p-3 bg-muted/20 rounded">
                          <p className="text-sm">{workout.notes}</p>
                        </div>
                      )}
                      {workout.rating && (
                        <div className="mt-2 flex items-center gap-1">
                          {Array.from({ length: workout.rating }).map(
                            (_, i) => (
                              <span key={i} className="text-yellow-400">
                                ⭐
                              </span>
                            ),
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Dumbbell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No workouts logged yet
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Start tracking your fitness journey by logging your first
                    workout
                  </p>
                  <Button onClick={() => setShowWorkoutLogger(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Log Your First Workout
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Nutrition Tab */}
          <TabsContent value="nutrition" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Nutrition History</h2>
                <p className="text-muted-foreground">
                  Track your meals and nutritional intake
                </p>
              </div>
              <Button onClick={() => setShowMealLogger(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Log Meal
              </Button>
            </div>

            {mealLogs.length > 0 ? (
              <div className="space-y-4">
                {mealLogs.map((meal) => (
                  <Card key={meal.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <span>
                              {meal.mealType === "breakfast"
                                ? "🌅"
                                : meal.mealType === "lunch"
                                  ? "☀️"
                                  : meal.mealType === "dinner"
                                    ? "🌙"
                                    : "🍎"}
                            </span>
                            {meal.mealName}
                          </CardTitle>
                          <CardDescription>
                            {new Date(meal.date).toLocaleDateString()} •{" "}
                            {meal.mealType}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">
                            {meal.nutrition.calories}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            calories
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 p-3 bg-muted/30 rounded-lg">
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">
                            {meal.nutrition.protein}g
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Protein
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">
                            {meal.nutrition.carbs}g
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Carbs
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-yellow-600">
                            {meal.nutrition.fat}g
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Fat
                          </div>
                        </div>
                      </div>
                      {meal.notes && (
                        <div className="mt-4 p-3 bg-muted/20 rounded">
                          <p className="text-sm">{meal.notes}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Utensils className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No meals logged yet
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Start tracking your nutrition by logging your first meal
                  </p>
                  <Button onClick={() => setShowMealLogger(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Log Your First Meal
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Fitness Goals</h2>
              <p className="text-muted-foreground">
                Set and track your fitness objectives
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Dumbbell className="w-5 h-5 text-primary" />
                    Weekly Workouts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Target</span>
                      <span className="font-bold">
                        {weeklyGoals.workouts.target} workouts
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Current</span>
                      <span className="font-bold text-primary">
                        {weeklyGoals.workouts.current}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{
                          width: `${Math.min(
                            100,
                            (weeklyGoals.workouts.current /
                              weeklyGoals.workouts.target) *
                              100,
                          )}%`,
                        }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {Math.max(
                        0,
                        weeklyGoals.workouts.target -
                          weeklyGoals.workouts.current,
                      )}{" "}
                      more to reach your goal
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-orange-600" />
                    Weekly Calories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Target</span>
                      <span className="font-bold">
                        {weeklyGoals.calories.target} cal
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Current</span>
                      <span className="font-bold text-orange-600">
                        {weeklyGoals.calories.current}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-600 h-2 rounded-full transition-all"
                        style={{
                          width: `${Math.min(
                            100,
                            (weeklyGoals.calories.current /
                              weeklyGoals.calories.target) *
                              100,
                          )}%`,
                        }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {Math.max(
                        0,
                        weeklyGoals.calories.target -
                          weeklyGoals.calories.current,
                      )}{" "}
                      more calories to burn
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-green-600" />
                    Meal Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Target</span>
                      <span className="font-bold">
                        {weeklyGoals.meals.target} meals
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Current</span>
                      <span className="font-bold text-green-600">
                        {weeklyGoals.meals.current}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all"
                        style={{
                          width: `${Math.min(
                            100,
                            (weeklyGoals.meals.current /
                              weeklyGoals.meals.target) *
                              100,
                          )}%`,
                        }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {Math.max(
                        0,
                        weeklyGoals.meals.target - weeklyGoals.meals.current,
                      )}{" "}
                      more meals to log
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Custom Goals
                </CardTitle>
                <CardDescription>
                  Set personalized fitness and health objectives
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Custom goal setting coming soon!</p>
                  <p className="text-sm">
                    Set weight targets, strength goals, and more
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
