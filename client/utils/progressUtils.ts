export interface WorkoutLog {
  id: string;
  date: string;
  workoutTemplateId: string;
  workoutName: string;
  duration: number; // actual duration in minutes
  exercises: {
    exerciseId: string;
    exerciseName: string;
    sets: {
      reps?: number;
      weight?: number;
      duration?: number;
      restTime?: number;
      completed: boolean;
    }[];
  }[];
  totalCalories: number;
  notes?: string;
  rating?: number; // 1-5 stars
}

export interface MealLog {
  id: string;
  date: string;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  mealTemplateId?: string;
  mealName: string;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
  };
  notes?: string;
}

export interface BodyMetrics {
  id: string;
  date: string;
  weight?: number;
  bodyFat?: number;
  muscleMass?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    thighs?: number;
  };
  photos?: {
    front?: string;
    side?: string;
    back?: string;
  };
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "workout" | "nutrition" | "consistency" | "milestone";
  requirement: {
    type: "count" | "streak" | "total" | "target";
    value: number;
    metric: string;
  };
  unlockedAt?: string;
  progress?: number;
}

// Sample data for demonstration
export const sampleWorkoutLogs: WorkoutLog[] = [
  {
    id: "1",
    date: "2024-01-15",
    workoutTemplateId: "beginner-full-body",
    workoutName: "Beginner Full Body",
    duration: 32,
    exercises: [
      {
        exerciseId: "push-ups",
        exerciseName: "Push-ups",
        sets: [
          { reps: 8, completed: true },
          { reps: 7, completed: true },
          { reps: 6, completed: true },
        ],
      },
      {
        exerciseId: "squats",
        exerciseName: "Bodyweight Squats",
        sets: [
          { reps: 12, completed: true },
          { reps: 12, completed: true },
          { reps: 10, completed: true },
        ],
      },
    ],
    totalCalories: 160,
    rating: 4,
    notes: "Felt stronger today!",
  },
  {
    id: "2",
    date: "2024-01-13",
    workoutTemplateId: "cardio-hiit",
    workoutName: "Quick HIIT Cardio",
    duration: 22,
    exercises: [
      {
        exerciseId: "jumping-jacks",
        exerciseName: "Jumping Jacks",
        sets: [
          { duration: 45, completed: true },
          { duration: 45, completed: true },
          { duration: 40, completed: true },
          { duration: 35, completed: true },
        ],
      },
    ],
    totalCalories: 220,
    rating: 5,
    notes: "Great cardio session!",
  },
];

export const sampleMealLogs: MealLog[] = [
  {
    id: "1",
    date: "2024-01-15",
    mealType: "breakfast",
    mealTemplateId: "protein-smoothie",
    mealName: "Protein Power Smoothie",
    nutrition: {
      calories: 320,
      protein: 25,
      carbs: 35,
      fat: 8,
      fiber: 6,
      sugar: 28,
    },
  },
  {
    id: "2",
    date: "2024-01-15",
    mealType: "lunch",
    mealTemplateId: "quinoa-bowl",
    mealName: "Mediterranean Quinoa Bowl",
    nutrition: {
      calories: 450,
      protein: 18,
      carbs: 52,
      fat: 18,
      fiber: 8,
      sugar: 6,
    },
  },
];

export const sampleBodyMetrics: BodyMetrics[] = [
  {
    id: "1",
    date: "2024-01-15",
    weight: 72.5,
    bodyFat: 18.2,
    measurements: {
      chest: 98,
      waist: 82,
      arms: 34,
      thighs: 58,
    },
  },
  {
    id: "2",
    date: "2024-01-08",
    weight: 73.1,
    bodyFat: 18.8,
    measurements: {
      chest: 97,
      waist: 83,
      arms: 33,
      thighs: 58,
    },
  },
];

export const achievements: Achievement[] = [
  {
    id: "first-workout",
    name: "First Step",
    description: "Complete your first workout",
    icon: "🎯",
    category: "milestone",
    requirement: { type: "count", value: 1, metric: "workouts" },
    unlockedAt: "2024-01-13",
  },
  {
    id: "week-streak",
    name: "Week Warrior",
    description: "Work out 5 times in a week",
    icon: "🔥",
    category: "consistency",
    requirement: { type: "count", value: 5, metric: "weekly_workouts" },
    progress: 3,
  },
  {
    id: "10-workouts",
    name: "Perfect Ten",
    description: "Complete 10 total workouts",
    icon: "💪",
    category: "workout",
    requirement: { type: "total", value: 10, metric: "workouts" },
    progress: 2,
  },
  {
    id: "calorie-burn",
    name: "Calorie Crusher",
    description: "Burn 1000 calories in workouts",
    icon: "🔥",
    category: "workout",
    requirement: { type: "total", value: 1000, metric: "calories" },
    progress: 380,
  },
  {
    id: "nutrition-log",
    name: "Meal Master",
    description: "Log meals for 7 consecutive days",
    icon: "🥗",
    category: "nutrition",
    requirement: { type: "streak", value: 7, metric: "meal_logs" },
    progress: 2,
  },
];

export const calculateWeeklyStats = (
  workoutLogs: WorkoutLog[],
  startDate: string,
) => {
  const start = new Date(startDate);
  const end = new Date(start);
  end.setDate(start.getDate() + 7);

  const weekWorkouts = workoutLogs.filter((log) => {
    const logDate = new Date(log.date);
    return logDate >= start && logDate < end;
  });

  return {
    totalWorkouts: weekWorkouts.length,
    totalDuration: weekWorkouts.reduce((sum, log) => sum + log.duration, 0),
    totalCalories: weekWorkouts.reduce(
      (sum, log) => sum + log.totalCalories,
      0,
    ),
    avgRating:
      weekWorkouts.length > 0
        ? weekWorkouts.reduce((sum, log) => sum + (log.rating || 0), 0) /
          weekWorkouts.length
        : 0,
  };
};

export const calculateMonthlyStats = (
  workoutLogs: WorkoutLog[],
  mealLogs: MealLog[],
  month: number,
  year: number,
) => {
  const monthWorkouts = workoutLogs.filter((log) => {
    const logDate = new Date(log.date);
    return logDate.getMonth() === month && logDate.getFullYear() === year;
  });

  const monthMeals = mealLogs.filter((log) => {
    const logDate = new Date(log.date);
    return logDate.getMonth() === month && logDate.getFullYear() === year;
  });

  const workoutsByDay = monthWorkouts.reduce(
    (acc, log) => {
      const day = new Date(log.date).getDate();
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>,
  );

  const mealsByDay = monthMeals.reduce(
    (acc, log) => {
      const day = new Date(log.date).getDate();
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>,
  );

  return {
    workouts: {
      total: monthWorkouts.length,
      totalDuration: monthWorkouts.reduce((sum, log) => sum + log.duration, 0),
      totalCalories: monthWorkouts.reduce(
        (sum, log) => sum + log.totalCalories,
        0,
      ),
      byDay: workoutsByDay,
    },
    meals: {
      total: monthMeals.length,
      totalCalories: monthMeals.reduce(
        (sum, log) => sum + log.nutrition.calories,
        0,
      ),
      avgProtein:
        monthMeals.length > 0
          ? monthMeals.reduce((sum, log) => sum + log.nutrition.protein, 0) /
            monthMeals.length
          : 0,
      byDay: mealsByDay,
    },
  };
};

export const getProgressTrend = (
  metrics: BodyMetrics[],
  metricType: keyof BodyMetrics["measurements"] | "weight" | "bodyFat",
) => {
  const sortedMetrics = [...metrics].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  const values = sortedMetrics
    .map((metric) => {
      if (metricType === "weight") return metric.weight;
      if (metricType === "bodyFat") return metric.bodyFat;
      return metric.measurements?.[
        metricType as keyof BodyMetrics["measurements"]
      ];
    })
    .filter((val) => val !== undefined) as number[];

  if (values.length < 2) return { trend: "stable", change: 0 };

  const first = values[0];
  const last = values[values.length - 1];
  const change = last - first;
  const percentChange = (change / first) * 100;

  let trend: "increasing" | "decreasing" | "stable" = "stable";
  if (Math.abs(percentChange) > 2) {
    trend = change > 0 ? "increasing" : "decreasing";
  }

  return { trend, change, percentChange };
};

export const updateAchievementProgress = (
  achievement: Achievement,
  logs: { workoutLogs: WorkoutLog[]; mealLogs: MealLog[] },
) => {
  const { workoutLogs, mealLogs } = logs;

  switch (achievement.id) {
    case "first-workout":
      return workoutLogs.length >= 1;

    case "week-streak":
      // Check if there are 5 workouts in the current week
      const thisWeek = new Date();
      thisWeek.setDate(thisWeek.getDate() - thisWeek.getDay());
      const weekStats = calculateWeeklyStats(
        workoutLogs,
        thisWeek.toISOString().split("T")[0],
      );
      return weekStats.totalWorkouts >= 5;

    case "10-workouts":
      return workoutLogs.length >= 10;

    case "calorie-burn":
      const totalCalories = workoutLogs.reduce(
        (sum, log) => sum + log.totalCalories,
        0,
      );
      return totalCalories >= 1000;

    case "nutrition-log":
      // Check for 7 consecutive days of meal logging
      const sortedMeals = [...mealLogs].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      let streak = 0;
      let currentDate = new Date();

      for (let i = 0; i < 7; i++) {
        const checkDate = new Date(currentDate);
        checkDate.setDate(currentDate.getDate() - i);
        const dateString = checkDate.toISOString().split("T")[0];

        if (sortedMeals.some((meal) => meal.date === dateString)) {
          streak++;
        } else {
          break;
        }
      }

      return streak >= 7;

    default:
      return false;
  }
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

export const getDateRange = (days: number): string[] => {
  const dates: string[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date.toISOString().split("T")[0]);
  }

  return dates;
};
