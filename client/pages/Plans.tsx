import React, { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Dumbbell,
  Utensils,
  Search,
  Filter,
  Plus,
  Clock,
  Flame,
  Users,
  Target,
  TrendingUp,
  BookOpen,
} from "lucide-react";
import {
  workoutTemplates,
  mealTemplates,
  WorkoutTemplate,
  MealTemplate,
} from "@/utils/workoutData";
import WorkoutCard from "@/components/plans/WorkoutCard";
import MealCard from "@/components/plans/MealCard";

export default function Plans() {
  const [searchTerm, setSearchTerm] = useState("");
  const [workoutFilter, setWorkoutFilter] = useState("all");
  const [mealFilter, setMealFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  // Filter workouts
  const filteredWorkouts = useMemo(() => {
    return workoutTemplates.filter((workout) => {
      const matchesSearch =
        workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workout.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workout.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      const matchesCategory =
        workoutFilter === "all" || workout.category === workoutFilter;
      const matchesDifficulty =
        difficultyFilter === "all" || workout.difficulty === difficultyFilter;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchTerm, workoutFilter, difficultyFilter]);

  // Filter meals
  const filteredMeals = useMemo(() => {
    return mealTemplates.filter((meal) => {
      const matchesSearch =
        meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meal.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      const matchesCategory =
        mealFilter === "all" || meal.category === mealFilter;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, mealFilter]);

  // Event handlers
  const handleStartWorkout = (workoutId: string) => {
    // In a real app, this would navigate to workout session
    console.log("Starting workout:", workoutId);
    // For demo, show a toast notification
    const event = new CustomEvent("showToast", {
      detail: {
        message: "Workout started! Timer is running.",
        type: "success",
      },
    });
    window.dispatchEvent(event);
  };

  const handleScheduleWorkout = (workoutId: string) => {
    console.log("Scheduling workout:", workoutId);
    const event = new CustomEvent("showToast", {
      detail: { message: "Workout added to your calendar!", type: "info" },
    });
    window.dispatchEvent(event);
  };

  const handleAddMealToLog = (mealId: string) => {
    console.log("Adding meal to log:", mealId);
    const event = new CustomEvent("showToast", {
      detail: { message: "Meal added to your food log!", type: "success" },
    });
    window.dispatchEvent(event);
  };

  const handleScheduleMeal = (mealId: string) => {
    console.log("Scheduling meal:", mealId);
    const event = new CustomEvent("showToast", {
      detail: { message: "Meal added to your meal plan!", type: "info" },
    });
    window.dispatchEvent(event);
  };

  // Stats calculations
  const workoutStats = {
    total: workoutTemplates.length,
    beginner: workoutTemplates.filter((w) => w.difficulty === "beginner")
      .length,
    intermediate: workoutTemplates.filter(
      (w) => w.difficulty === "intermediate",
    ).length,
    advanced: workoutTemplates.filter((w) => w.difficulty === "advanced")
      .length,
    avgDuration: Math.round(
      workoutTemplates.reduce((sum, w) => sum + w.duration, 0) /
        workoutTemplates.length,
    ),
    totalCalories: workoutTemplates.reduce((sum, w) => sum + w.calories, 0),
  };

  const mealStats = {
    total: mealTemplates.length,
    breakfast: mealTemplates.filter((m) => m.category === "breakfast").length,
    lunch: mealTemplates.filter((m) => m.category === "lunch").length,
    dinner: mealTemplates.filter((m) => m.category === "dinner").length,
    snack: mealTemplates.filter((m) => m.category === "snack").length,
    avgCalories: Math.round(
      mealTemplates.reduce((sum, m) => sum + m.nutrition.calories, 0) /
        mealTemplates.length,
    ),
    avgPrepTime: Math.round(
      mealTemplates.reduce((sum, m) => sum + m.prepTime, 0) /
        mealTemplates.length,
    ),
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Workout & Meal Plans
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover personalized workout routines and nutritious meal plans
            designed to help you reach your fitness goals
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">
                {workoutStats.total}
              </div>
              <div className="text-sm text-muted-foreground">Workout Plans</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                {mealStats.total}
              </div>
              <div className="text-sm text-muted-foreground">Meal Plans</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-orange-600">
                {workoutStats.avgDuration}m
              </div>
              <div className="text-sm text-muted-foreground">Avg Workout</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">
                {mealStats.avgCalories}
              </div>
              <div className="text-sm text-muted-foreground">Avg Calories</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Find Your Perfect Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search workouts and meals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <Select
                  value={difficultyFilter}
                  onValueChange={setDifficultyFilter}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="workouts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="workouts" className="flex items-center gap-2">
              <Dumbbell className="w-4 h-4" />
              Workout Templates ({filteredWorkouts.length})
            </TabsTrigger>
            <TabsTrigger value="meals" className="flex items-center gap-2">
              <Utensils className="w-4 h-4" />
              Meal Templates ({filteredMeals.length})
            </TabsTrigger>
          </TabsList>

          {/* Workouts Tab */}
          <TabsContent value="workouts" className="space-y-6">
            {/* Workout Category Filter */}
            <div className="flex items-center gap-4">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={workoutFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setWorkoutFilter("all")}
                >
                  All
                </Button>
                <Button
                  variant={workoutFilter === "strength" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setWorkoutFilter("strength")}
                >
                  💪 Strength
                </Button>
                <Button
                  variant={workoutFilter === "cardio" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setWorkoutFilter("cardio")}
                >
                  ❤️ Cardio
                </Button>
                <Button
                  variant={workoutFilter === "hiit" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setWorkoutFilter("hiit")}
                >
                  🔥 HIIT
                </Button>
                <Button
                  variant={
                    workoutFilter === "flexibility" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setWorkoutFilter("flexibility")}
                >
                  🧘 Flexibility
                </Button>
              </div>
            </div>

            {/* Workout Grid */}
            {filteredWorkouts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorkouts.map((workout) => (
                  <WorkoutCard
                    key={workout.id}
                    workout={workout}
                    onStart={handleStartWorkout}
                    onSchedule={handleScheduleWorkout}
                  />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No workouts found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Meals Tab */}
          <TabsContent value="meals" className="space-y-6">
            {/* Meal Category Filter */}
            <div className="flex items-center gap-4">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={mealFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMealFilter("all")}
                >
                  All
                </Button>
                <Button
                  variant={mealFilter === "breakfast" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMealFilter("breakfast")}
                >
                  🌅 Breakfast
                </Button>
                <Button
                  variant={mealFilter === "lunch" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMealFilter("lunch")}
                >
                  ☀️ Lunch
                </Button>
                <Button
                  variant={mealFilter === "dinner" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMealFilter("dinner")}
                >
                  🌙 Dinner
                </Button>
                <Button
                  variant={mealFilter === "snack" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMealFilter("snack")}
                >
                  🍎 Snacks
                </Button>
              </div>
            </div>

            {/* Meal Grid */}
            {filteredMeals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMeals.map((meal) => (
                  <MealCard
                    key={meal.id}
                    meal={meal}
                    onAddToLog={handleAddMealToLog}
                    onSchedule={handleScheduleMeal}
                  />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Utensils className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No meals found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Additional Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Weekly Planner
              </CardTitle>
              <CardDescription>
                Plan your entire week with our smart scheduling system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="font-medium">This Week's Goal</span>
                  <Badge variant="outline">4 workouts</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="font-medium">Meal Prep Day</span>
                  <Badge variant="outline">Sunday</Badge>
                </div>
                <Button className="w-full" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Weekly Plan
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Progress Insights
              </CardTitle>
              <CardDescription>
                Track how your plans are helping you improve
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-green-800">
                    Completed This Week
                  </span>
                  <span className="font-bold text-green-700">3/4 workouts</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium text-blue-800">
                    Calories Burned
                  </span>
                  <span className="font-bold text-blue-700">1,240 cal</span>
                </div>
                <Button className="w-full" variant="outline">
                  <BookOpen className="w-4 h-4 mr-2" />
                  View Full Progress
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
