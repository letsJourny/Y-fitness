import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Minus,
  Save,
  Timer,
  Weight,
  RotateCcw,
  Star,
  Clock,
} from "lucide-react";
import {
  workoutTemplates,
  sampleExercises,
  getExerciseById,
} from "@/utils/workoutData";
import { WorkoutLog } from "@/utils/progressUtils";

interface WorkoutLoggerProps {
  onSave: (workoutLog: WorkoutLog) => void;
  onCancel: () => void;
}

interface ExerciseSet {
  reps?: number;
  weight?: number;
  duration?: number;
  restTime?: number;
  completed: boolean;
}

interface LoggedExercise {
  exerciseId: string;
  exerciseName: string;
  sets: ExerciseSet[];
}

export default function WorkoutLogger({
  onSave,
  onCancel,
}: WorkoutLoggerProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState<LoggedExercise[]>([]);
  const [duration, setDuration] = useState(0);
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const startTimer = () => {
    setIsTimerRunning(true);
    setStartTime(new Date());
  };

  const stopTimer = () => {
    if (startTime) {
      const endTime = new Date();
      const durationMinutes = Math.round(
        (endTime.getTime() - startTime.getTime()) / (1000 * 60),
      );
      setDuration(durationMinutes);
    }
    setIsTimerRunning(false);
    setStartTime(null);
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = workoutTemplates.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setWorkoutName(template.name);

      const loggedExercises: LoggedExercise[] = template.exercises.map((ex) => {
        const exerciseData = getExerciseById(ex.exerciseId);
        return {
          exerciseId: ex.exerciseId,
          exerciseName: exerciseData?.name || "Unknown Exercise",
          sets: Array(ex.sets || 1)
            .fill(null)
            .map(() => ({
              reps: ex.reps,
              weight: ex.weight,
              duration: ex.duration,
              restTime: ex.restTime,
              completed: false,
            })),
        };
      });

      setExercises(loggedExercises);
    }
  };

  const addExercise = (exerciseId: string) => {
    const exerciseData = getExerciseById(exerciseId);
    if (exerciseData) {
      const newExercise: LoggedExercise = {
        exerciseId,
        exerciseName: exerciseData.name,
        sets: [{ completed: false }],
      };
      setExercises([...exercises, newExercise]);
    }
  };

  const addSet = (exerciseIndex: number) => {
    const updated = [...exercises];
    updated[exerciseIndex].sets.push({ completed: false });
    setExercises(updated);
  };

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    const updated = [...exercises];
    updated[exerciseIndex].sets.splice(setIndex, 1);
    setExercises(updated);
  };

  const updateSet = (
    exerciseIndex: number,
    setIndex: number,
    field: keyof ExerciseSet,
    value: any,
  ) => {
    const updated = [...exercises];
    updated[exerciseIndex].sets[setIndex] = {
      ...updated[exerciseIndex].sets[setIndex],
      [field]: value,
    };
    setExercises(updated);
  };

  const removeExercise = (exerciseIndex: number) => {
    const updated = [...exercises];
    updated.splice(exerciseIndex, 1);
    setExercises(updated);
  };

  const handleSave = () => {
    if (!workoutName.trim() || exercises.length === 0) {
      const event = new CustomEvent("showToast", {
        detail: {
          message: "Please add a workout name and at least one exercise",
          type: "error",
        },
      });
      window.dispatchEvent(event);
      return;
    }

    const totalCalories = Math.round(duration * 6); // Simple estimation

    const workoutLog: WorkoutLog = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      workoutTemplateId: selectedTemplate,
      workoutName,
      duration: duration || 30,
      exercises,
      totalCalories,
      notes,
      rating: rating || undefined,
    };

    onSave(workoutLog);
  };

  const currentDuration =
    isTimerRunning && startTime
      ? Math.round((Date.now() - startTime.getTime()) / (1000 * 60))
      : duration;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Weight className="w-5 h-5" />
            Log Your Workout
          </CardTitle>
          <CardDescription>
            Track your exercises, sets, reps, and weights
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Template Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="template">Start from Template (Optional)</Label>
              <Select
                value={selectedTemplate}
                onValueChange={handleTemplateSelect}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a workout template" />
                </SelectTrigger>
                <SelectContent>
                  {workoutTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name} ({template.duration}m)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="workoutName">Workout Name</Label>
              <Input
                id="workoutName"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                placeholder="Enter workout name"
              />
            </div>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="font-medium">Duration:</span>
              <span className="text-lg font-bold text-primary">
                {currentDuration}m
              </span>
            </div>

            {!isTimerRunning ? (
              <Button onClick={startTimer} size="sm">
                <Timer className="w-4 h-4 mr-2" />
                Start Timer
              </Button>
            ) : (
              <Button onClick={stopTimer} variant="destructive" size="sm">
                <Timer className="w-4 h-4 mr-2" />
                Stop Timer
              </Button>
            )}

            <div className="ml-auto">
              <Input
                type="number"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                placeholder="Manual duration"
                className="w-24"
                min="0"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exercises */}
      <Card>
        <CardHeader>
          <CardTitle>Exercises</CardTitle>
          <CardDescription>
            Add exercises and track your sets, reps, and weights
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add Exercise */}
          <div className="space-y-2">
            <Label>Add Exercise</Label>
            <Select onValueChange={addExercise}>
              <SelectTrigger>
                <SelectValue placeholder="Select an exercise to add" />
              </SelectTrigger>
              <SelectContent>
                {sampleExercises.map((exercise) => (
                  <SelectItem key={exercise.id} value={exercise.id}>
                    {exercise.name} ({exercise.category})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Exercise List */}
          {exercises.map((exercise, exerciseIndex) => (
            <Card key={exerciseIndex} className="border border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {exercise.exerciseName}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExercise(exerciseIndex)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Sets */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Sets</Label>
                    <Button
                      onClick={() => addSet(exerciseIndex)}
                      size="sm"
                      variant="outline"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Set
                    </Button>
                  </div>

                  {exercise.sets.map((set, setIndex) => (
                    <div
                      key={setIndex}
                      className="grid grid-cols-5 gap-2 items-center p-2 bg-muted/20 rounded"
                    >
                      <div className="text-sm font-medium">#{setIndex + 1}</div>

                      <Input
                        type="number"
                        placeholder="Reps"
                        value={set.reps || ""}
                        onChange={(e) =>
                          updateSet(
                            exerciseIndex,
                            setIndex,
                            "reps",
                            parseInt(e.target.value) || undefined,
                          )
                        }
                        className="text-sm"
                      />

                      <Input
                        type="number"
                        placeholder="Weight (kg)"
                        value={set.weight || ""}
                        onChange={(e) =>
                          updateSet(
                            exerciseIndex,
                            setIndex,
                            "weight",
                            parseFloat(e.target.value) || undefined,
                          )
                        }
                        className="text-sm"
                      />

                      <Button
                        size="sm"
                        variant={set.completed ? "default" : "outline"}
                        onClick={() =>
                          updateSet(
                            exerciseIndex,
                            setIndex,
                            "completed",
                            !set.completed,
                          )
                        }
                      >
                        ✓
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeSet(exerciseIndex, setIndex)}
                        disabled={exercise.sets.length <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {exercises.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Weight className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>
                No exercises added yet. Select a template or add exercises
                manually.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notes and Rating */}
      <Card>
        <CardHeader>
          <CardTitle>Workout Feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rating">How was your workout?</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  variant="ghost"
                  size="sm"
                  onClick={() => setRating(star)}
                  className={`p-1 ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  <Star className="w-5 h-5 fill-current" />
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How did you feel? Any observations or improvements?"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        <Button onClick={handleSave} className="flex-1">
          <Save className="w-4 h-4 mr-2" />
          Save Workout
        </Button>
        <Button onClick={onCancel} variant="outline">
          Cancel
        </Button>
      </div>
    </div>
  );
}
