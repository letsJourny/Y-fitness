import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Flame, Users, Play, Calendar, Info } from "lucide-react";
import { WorkoutTemplate, getExerciseById } from "@/utils/workoutData";

interface WorkoutCardProps {
  workout: WorkoutTemplate;
  onStart?: (workoutId: string) => void;
  onSchedule?: (workoutId: string) => void;
  onViewDetails?: (workoutId: string) => void;
}

export default function WorkoutCard({
  workout,
  onStart,
  onSchedule,
  onViewDetails,
}: WorkoutCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "strength":
        return "💪";
      case "cardio":
        return "❤️";
      case "hiit":
        return "🔥";
      case "flexibility":
        return "🧘";
      case "sports":
        return "⚽";
      default:
        return "🏃";
    }
  };

  const exerciseCount = workout.exercises.length;
  const muscleGroups = Array.from(
    new Set(
      workout.exercises
        .map((ex) => getExerciseById(ex.exerciseId))
        .filter(Boolean)
        .flatMap((ex) => ex!.muscleGroups),
    ),
  );

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200 border border-border">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <span className="text-xl">
                {getCategoryIcon(workout.category)}
              </span>
              {workout.name}
            </CardTitle>
            <CardDescription className="text-sm">
              {workout.description}
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className={`ml-2 ${getDifficultyColor(workout.difficulty)}`}
          >
            {workout.difficulty}
          </Badge>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
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
            <span>{exerciseCount} exercises</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {workout.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {workout.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{workout.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Muscle Groups */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Target Muscles:</h4>
          <div className="flex flex-wrap gap-1">
            {muscleGroups.slice(0, 4).map((muscle, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md capitalize"
              >
                {muscle}
              </span>
            ))}
            {muscleGroups.length > 4 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                +{muscleGroups.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Exercise Preview */}
        {isExpanded && (
          <div className="space-y-2 border-t pt-4">
            <h4 className="text-sm font-medium">Exercises:</h4>
            <div className="space-y-2">
              {workout.exercises.map((exercise, index) => {
                const exerciseData = getExerciseById(exercise.exerciseId);
                if (!exerciseData) return null;

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm bg-muted/30 p-2 rounded"
                  >
                    <span className="font-medium">{exerciseData.name}</span>
                    <span className="text-muted-foreground">
                      {exercise.sets &&
                        exercise.reps &&
                        `${exercise.sets} × ${exercise.reps}`}
                      {exercise.duration && `${exercise.duration}s`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button className="flex-1" onClick={() => onStart?.(workout.id)}>
            <Play className="w-4 h-4 mr-2" />
            Start Workout
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onSchedule?.(workout.id)}
          >
            <Calendar className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Info className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
