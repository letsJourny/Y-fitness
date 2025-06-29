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
  Calendar,
  Dumbbell,
  Utensils,
  Clock,
  Flame,
  Users,
} from "lucide-react";

export default function Plans() {
  const handleStartWorkout = () => {
    alert("Workout started! (Demo)");
  };

  const handleAddMeal = () => {
    alert("Meal added to log! (Demo)");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Workout & Meal Plans
          </h1>
          <p className="text-muted-foreground">
            Your personalized fitness and nutrition plans
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-sm text-muted-foreground">Workout Plans</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">24</div>
              <div className="text-sm text-muted-foreground">Meal Plans</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-orange-600">35m</div>
              <div className="text-sm text-muted-foreground">Avg Workout</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">420</div>
              <div className="text-sm text-muted-foreground">Avg Calories</div>
            </CardContent>
          </Card>
        </div>

        {/* Workout Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Dumbbell className="w-6 h-6 text-primary" />
              Workout Templates
            </h2>

            {/* Sample Workout Cards */}
            {[
              {
                name: "Beginner Full Body",
                description:
                  "Perfect starter workout hitting all major muscle groups",
                duration: 30,
                exercises: 4,
                calories: 150,
                difficulty: "Beginner",
              },
              {
                name: "HIIT Cardio",
                description:
                  "High-intensity interval training for maximum calorie burn",
                duration: 20,
                exercises: 3,
                calories: 200,
                difficulty: "Intermediate",
              },
              {
                name: "Upper Body Strength",
                description: "Focus on building upper body strength and muscle",
                duration: 45,
                exercises: 6,
                calories: 180,
                difficulty: "Advanced",
              },
            ].map((workout, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{workout.name}</CardTitle>
                      <CardDescription>{workout.description}</CardDescription>
                    </div>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                      {workout.difficulty}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{workout.duration}m</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4" />
                      <span>{workout.calories} cal</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{workout.exercises} exercises</span>
                    </div>
                  </div>
                  <Button onClick={handleStartWorkout} className="w-full">
                    Start Workout
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Meal Plans */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Utensils className="w-6 h-6 text-green-600" />
              Meal Templates
            </h2>

            {/* Sample Meal Cards */}
            {[
              {
                name: "Protein Power Smoothie",
                description:
                  "Perfect post-workout recovery drink packed with protein",
                calories: 320,
                protein: 25,
                prepTime: 5,
                category: "Breakfast",
              },
              {
                name: "Mediterranean Quinoa Bowl",
                description:
                  "Nutrient-dense bowl with complete proteins and healthy fats",
                calories: 450,
                protein: 18,
                prepTime: 25,
                category: "Lunch",
              },
              {
                name: "Grilled Salmon & Vegetables",
                description:
                  "Omega-3 rich salmon with colorful roasted vegetables",
                calories: 380,
                protein: 32,
                prepTime: 30,
                category: "Dinner",
              },
            ].map((meal, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{meal.name}</CardTitle>
                      <CardDescription>{meal.description}</CardDescription>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-md">
                      {meal.category}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 p-3 bg-muted/30 rounded-lg mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">
                        {meal.calories}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Calories
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">
                        {meal.protein}g
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Protein
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">
                        {meal.prepTime}m
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Prep Time
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={handleAddMeal}
                    variant="outline"
                    className="w-full"
                  >
                    Add to Meal Log
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Ready to Start Your Fitness Journey?
            </CardTitle>
            <CardDescription>
              Choose from our expertly designed workout and meal plans
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleStartWorkout}>
                <Dumbbell className="w-4 h-4 mr-2" />
                Start First Workout
              </Button>
              <Button variant="outline" size="lg" onClick={handleAddMeal}>
                <Utensils className="w-4 h-4 mr-2" />
                Plan Your Meals
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
