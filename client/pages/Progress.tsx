import React from "react";
import Navigation from "@/components/Navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Calendar,
  TrendingUp,
  Target,
  Dumbbell,
  Utensils,
  Activity,
  Award,
  Scale,
  Plus,
} from "lucide-react";

export default function Progress() {
  const handleLogWorkout = () => {
    alert("Workout logging feature coming soon!");
  };

  const handleLogMeal = () => {
    alert("Meal logging feature coming soon!");
  };

  const handleUpdateMetrics = () => {
    alert("Body metrics tracking coming soon!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Logging & Progress
          </h1>
          <p className="text-muted-foreground">
            Track your fitness journey and view detailed analytics
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
                  <div className="text-2xl font-bold text-primary">450</div>
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
                  <div className="text-2xl font-bold text-green-600">1,240</div>
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
                  <div className="text-2xl font-bold text-orange-600">3/4</div>
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
                  <div className="text-2xl font-bold text-yellow-600">5</div>
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
              <Button
                onClick={handleLogWorkout}
                className="h-20 flex-col gap-2"
              >
                <Dumbbell className="w-6 h-6" />
                Log Workout
              </Button>

              <Button
                onClick={handleLogMeal}
                variant="outline"
                className="h-20 flex-col gap-2"
              >
                <Utensils className="w-6 h-6" />
                Log Meal
              </Button>

              <Button
                onClick={handleUpdateMetrics}
                variant="outline"
                className="h-20 flex-col gap-2"
              >
                <Scale className="w-6 h-6" />
                Body Metrics
              </Button>

              <Button
                onClick={handleUpdateMetrics}
                variant="outline"
                className="h-20 flex-col gap-2"
              >
                <Target className="w-6 h-6" />
                Progress Photos
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Progress Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Recent Workouts
              </CardTitle>
              <CardDescription>Your latest workout sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    name: "Full Body Workout",
                    date: "Today",
                    duration: "32 min",
                    calories: 180,
                    rating: 4,
                  },
                  {
                    name: "HIIT Cardio",
                    date: "Yesterday",
                    duration: "22 min",
                    calories: 220,
                    rating: 5,
                  },
                  {
                    name: "Upper Body",
                    date: "2 days ago",
                    duration: "45 min",
                    calories: 195,
                    rating: 4,
                  },
                ].map((workout, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="font-medium">{workout.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {workout.date} • {workout.duration}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">
                        {workout.calories}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        calories
                      </div>
                    </div>
                    <div className="flex items-center gap-1 ml-4">
                      {Array.from({ length: workout.rating }).map((_, i) => (
                        <span key={i} className="text-yellow-400 text-sm">
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <Button
                onClick={handleLogWorkout}
                variant="outline"
                className="w-full mt-4"
              >
                <Plus className="w-4 h-4 mr-2" />
                Log New Workout
              </Button>
            </CardContent>
          </Card>

          {/* Progress Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Progress Overview
              </CardTitle>
              <CardDescription>
                Your fitness journey at a glance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-800">
                      Weekly Goal
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-700">
                      75% Complete
                    </div>
                    <div className="text-xs text-green-600">3/4 workouts</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-800">
                      Weight Progress
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-700">
                      -2.1kg
                    </div>
                    <div className="text-xs text-blue-600">This month</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-orange-600" />
                    <span className="font-medium text-orange-800">Streak</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-orange-700">
                      12 days
                    </div>
                    <div className="text-xs text-orange-600">
                      Keep it going!
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-600" />
                    <span className="font-medium text-purple-800">
                      Next Achievement
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-purple-700">
                      Week Warrior
                    </div>
                    <div className="text-xs text-purple-600">
                      1 more workout
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Goals Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Fitness Goals
            </CardTitle>
            <CardDescription>
              Track your progress towards your objectives
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Weekly Workouts</span>
                  <span className="text-sm text-muted-foreground">3/4</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: "75%" }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  1 more workout to reach your goal
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Weight Loss</span>
                  <span className="text-sm text-muted-foreground">
                    2.1/5.0 kg
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all"
                    style={{ width: "42%" }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  2.9 kg remaining to target
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Daily Calories</span>
                  <span className="text-sm text-muted-foreground">
                    1240/1500
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-600 h-2 rounded-full transition-all"
                    style={{ width: "83%" }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  260 calories remaining today
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
