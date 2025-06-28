import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import {
  BarChart3,
  Calendar,
  Utensils,
  Trophy,
  ArrowRight,
  Plus,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, Sarah!
          </h1>
          <p className="text-muted-foreground">
            Here's your fitness progress for today.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Workouts
                  </p>
                  <p className="text-2xl font-bold">3/3</p>
                </div>
                <Trophy className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Calories
                  </p>
                  <p className="text-2xl font-bold">1,847</p>
                </div>
                <Utensils className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Weight
                  </p>
                  <p className="text-2xl font-bold">68.5kg</p>
                </div>
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Streak
                  </p>
                  <p className="text-2xl font-bold">12 days</p>
                </div>
                <Calendar className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Today's Workout */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Today's Workout
              </CardTitle>
              <CardDescription>Upper Body Strength</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Push-ups</span>
                  <span className="font-medium">3 x 12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Bench Press</span>
                  <span className="font-medium">4 x 8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Pull-ups</span>
                  <span className="font-medium">3 x 10</span>
                </div>
              </div>
              <Button className="w-full">
                Start Workout
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Today's Meals */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-primary" />
                Today's Meals
              </CardTitle>
              <CardDescription>1,847 / 2,100 calories</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Breakfast</span>
                  <span className="font-medium">420 cal ✓</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Lunch</span>
                  <span className="font-medium">580 cal ✓</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Dinner</span>
                  <span className="font-medium">650 cal</span>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 w-4 h-4" />
                Log Meal
              </Button>
            </CardContent>
          </Card>

          {/* Progress Summary */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Progress Summary
              </CardTitle>
              <CardDescription>This week</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Workouts</span>
                    <span>5/6</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-5/6"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Nutrition</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-4/5"></div>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                View Detailed Report
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">My Plans</h3>
                  <p className="text-muted-foreground">
                    View and manage your workout and meal plans
                  </p>
                </div>
                <ArrowRight className="w-6 h-6 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">Manage Subscription</h3>
                  <p className="text-muted-foreground">
                    Update your subscription and billing
                  </p>
                </div>
                <ArrowRight className="w-6 h-6 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
