import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import {
  BarChart3,
  Calendar,
  Utensils,
  Trophy,
  ArrowRight,
  Plus,
  Play,
  Clock,
  Target,
  Flame,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Timer,
  Zap,
  Heart,
  Activity,
  User,
  Settings,
  Bell,
} from "lucide-react";
import { useState, useEffect } from "react";
import SEO, { seoConfigs } from "@/components/SEO";

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeWorkout, setActiveWorkout] = useState(false);
  const [workoutTimer, setWorkoutTimer] = useState(0);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Mock workout timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeWorkout) {
      interval = setInterval(() => {
        setWorkoutTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeWorkout]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const weeklyProgress = [
    { day: "Mon", workouts: 1, calories: 1850 },
    { day: "Tue", workouts: 1, calories: 2100 },
    { day: "Wed", workouts: 0, calories: 1920 },
    { day: "Thu", workouts: 1, calories: 2050 },
    { day: "Fri", workouts: 1, calories: 1990 },
    { day: "Sat", workouts: 0, calories: 2200 },
    { day: "Sun", workouts: 1, calories: 1880 },
  ];

  const upcomingWorkouts = [
    {
      id: 1,
      name: "Upper Body Strength",
      time: "10:00 AM",
      duration: "45 min",
      exercises: ["Push-ups", "Bench Press", "Pull-ups"],
      difficulty: "Intermediate",
    },
    {
      id: 2,
      name: "Cardio Blast",
      time: "6:00 PM",
      duration: "30 min",
      exercises: ["Running", "Burpees", "Jump Rope"],
      difficulty: "Beginner",
    },
  ];

  const todaysMeals = [
    {
      name: "Breakfast",
      time: "8:00 AM",
      calories: 420,
      completed: true,
      foods: ["Oatmeal", "Banana", "Greek Yogurt"],
    },
    {
      name: "Lunch",
      time: "1:00 PM",
      calories: 580,
      completed: true,
      foods: ["Grilled Chicken", "Quinoa", "Vegetables"],
    },
    {
      name: "Snack",
      time: "4:00 PM",
      calories: 150,
      completed: false,
      foods: ["Apple", "Almonds"],
    },
    {
      name: "Dinner",
      time: "7:00 PM",
      calories: 650,
      completed: false,
      foods: ["Salmon", "Sweet Potato", "Broccoli"],
    },
  ];

  const achievements = [
    {
      name: "Week Warrior",
      desc: "Completed 5 workouts this week",
      unlocked: true,
    },
    {
      name: "Calorie Crusher",
      desc: "Hit calorie goals 7 days straight",
      unlocked: true,
    },
    {
      name: "Early Bird",
      desc: "Morning workout 3 days in a row",
      unlocked: false,
    },
    {
      name: "Consistency King",
      desc: "30-day workout streak",
      unlocked: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO {...seoConfigs.dashboard} />
      <Navigation isAuthenticated={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, Sarah! 💪
            </h1>
            <p className="text-muted-foreground">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Active Workout Banner */}
        {activeWorkout && (
          <Card className="mb-6 border-primary bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Timer className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Workout in Progress
                    </h3>
                    <p className="text-muted-foreground">
                      Upper Body Strength • {formatTime(workoutTimer)}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Pause
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setActiveWorkout(false);
                      setWorkoutTimer(0);
                    }}
                  >
                    End Workout
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Today's Workouts
                  </p>
                  <p className="text-2xl font-bold text-primary">2/3</p>
                  <p className="text-xs text-muted-foreground">
                    +1 from yesterday
                  </p>
                </div>
                <Trophy className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Calories
                  </p>
                  <p className="text-2xl font-bold text-orange-500">1,847</p>
                  <p className="text-xs text-muted-foreground">253 remaining</p>
                </div>
                <Flame className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Active Minutes
                  </p>
                  <p className="text-2xl font-bold text-green-500">82</p>
                  <p className="text-xs text-muted-foreground">Goal: 120 min</p>
                </div>
                <Activity className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Current Streak
                  </p>
                  <p className="text-2xl font-bold text-blue-500">12</p>
                  <p className="text-xs text-muted-foreground">days strong!</p>
                </div>
                <Zap className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Today's Schedule */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Today's Schedule
              </CardTitle>
              <CardDescription>Your planned workouts and meals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Workouts Section */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Workouts
                </h4>
                <div className="space-y-3">
                  {upcomingWorkouts.map((workout) => (
                    <div
                      key={workout.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-medium">{workout.name}</h5>
                          <Badge variant="secondary" className="text-xs">
                            {workout.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {workout.time} • {workout.duration}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {workout.exercises.join(", ")}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => setActiveWorkout(true)}
                        disabled={activeWorkout}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Start
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meals Section */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Utensils className="w-4 h-4" />
                  Meals
                </h4>
                <div className="space-y-2">
                  {todaysMeals.map((meal, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {meal.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-muted-foreground" />
                        )}
                        <div>
                          <p className="font-medium">{meal.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {meal.time} • {meal.calories} cal
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {meal.foods.join(", ")}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        {meal.completed ? "Edit" : "Log"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress & Goals */}
          <div className="space-y-6">
            {/* Weekly Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Weekly Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Workouts</span>
                      <span>5/7 days</span>
                    </div>
                    <Progress value={71} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Nutrition</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Sleep</span>
                      <span>7.2 hrs avg</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                </div>

                {/* Mini Chart */}
                <div className="mt-6">
                  <p className="text-sm font-medium mb-3">Daily Activity</p>
                  <div className="flex items-end gap-1 h-16">
                    {weeklyProgress.map((day, index) => (
                      <div
                        key={index}
                        className="flex-1 flex flex-col items-center"
                      >
                        <div
                          className="w-full bg-primary rounded-sm"
                          style={{
                            height: `${day.workouts * 50 + 10}px`,
                          }}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          {day.day}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        achievement.unlocked
                          ? "bg-primary/10 border border-primary/20"
                          : "bg-muted/50"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          achievement.unlocked
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <Trophy className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {achievement.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {achievement.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow border-dashed">
            <CardContent className="p-6 text-center">
              <Plus className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Quick Log</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Log a meal, workout, or weight entry
              </p>
              <Button variant="outline" className="w-full">
                Add Entry
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Health Metrics</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Track weight, body fat, and measurements
              </p>
              <Button variant="outline" className="w-full">
                View Metrics
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <User className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Personal Trainer</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get personalized guidance and support
              </p>
              <Button variant="outline" className="w-full">
                Chat Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
