export interface Exercise {
  id: string;
  name: string;
  category: "strength" | "cardio" | "flexibility" | "sports";
  muscleGroups: string[];
  equipment: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  instructions: string[];
  tips?: string[];
}

export interface WorkoutTemplate {
  id: string;
  name: string;
  description: string;
  duration: number; // minutes
  difficulty: "beginner" | "intermediate" | "advanced";
  category: "strength" | "cardio" | "flexibility" | "hiit" | "sports";
  exercises: {
    exerciseId: string;
    sets?: number;
    reps?: number;
    duration?: number; // seconds
    restTime?: number; // seconds
    weight?: number; // kg
    notes?: string;
  }[];
  calories: number;
  tags: string[];
}

export interface MealTemplate {
  id: string;
  name: string;
  description: string;
  category: "breakfast" | "lunch" | "dinner" | "snack";
  prepTime: number; // minutes
  servings: number;
  nutrition: {
    calories: number;
    protein: number; // grams
    carbs: number; // grams
    fat: number; // grams
    fiber: number; // grams
    sugar: number; // grams
  };
  ingredients: {
    name: string;
    amount: number;
    unit: string;
  }[];
  instructions: string[];
  tags: string[];
}

export const sampleExercises: Exercise[] = [
  {
    id: "push-ups",
    name: "Push-ups",
    category: "strength",
    muscleGroups: ["chest", "shoulders", "triceps", "core"],
    equipment: ["bodyweight"],
    difficulty: "beginner",
    instructions: [
      "Start in a plank position with hands slightly wider than shoulders",
      "Lower your body until chest nearly touches the floor",
      "Push back up to starting position",
      "Keep your body in a straight line throughout",
    ],
    tips: ["Keep core engaged", "Don't let hips sag", "Control the movement"],
  },
  {
    id: "squats",
    name: "Bodyweight Squats",
    category: "strength",
    muscleGroups: ["quadriceps", "glutes", "hamstrings", "core"],
    equipment: ["bodyweight"],
    difficulty: "beginner",
    instructions: [
      "Stand with feet shoulder-width apart",
      "Lower down as if sitting back into a chair",
      "Keep chest up and knees behind toes",
      "Return to standing position",
    ],
    tips: ["Keep weight in heels", "Don't let knees cave inward"],
  },
  {
    id: "plank",
    name: "Plank Hold",
    category: "strength",
    muscleGroups: ["core", "shoulders", "back"],
    equipment: ["bodyweight"],
    difficulty: "beginner",
    instructions: [
      "Start in push-up position",
      "Lower to forearms, keeping body straight",
      "Hold position, engaging core",
      "Breathe normally throughout",
    ],
    tips: ["Don't let hips sag or pike up", "Keep head neutral"],
  },
  {
    id: "jumping-jacks",
    name: "Jumping Jacks",
    category: "cardio",
    muscleGroups: ["full body"],
    equipment: ["bodyweight"],
    difficulty: "beginner",
    instructions: [
      "Start standing with feet together, arms at sides",
      "Jump feet apart while raising arms overhead",
      "Jump back to starting position",
      "Maintain steady rhythm",
    ],
    tips: ["Land softly on balls of feet", "Keep core engaged"],
  },
  {
    id: "lunges",
    name: "Forward Lunges",
    category: "strength",
    muscleGroups: ["quadriceps", "glutes", "hamstrings"],
    equipment: ["bodyweight"],
    difficulty: "intermediate",
    instructions: [
      "Step forward into lunge position",
      "Lower back knee toward ground",
      "Push back to starting position",
      "Alternate legs",
    ],
    tips: ["Keep front knee over ankle", "Engage core for balance"],
  },
  {
    id: "burpees",
    name: "Burpees",
    category: "cardio",
    muscleGroups: ["full body"],
    equipment: ["bodyweight"],
    difficulty: "advanced",
    instructions: [
      "Start standing, then squat and place hands on floor",
      "Jump feet back into plank position",
      "Do a push-up (optional)",
      "Jump feet back to squat, then jump up with arms overhead",
    ],
    tips: [
      "Maintain good form even when tired",
      "Modify by stepping instead of jumping",
    ],
  },
];

export const workoutTemplates: WorkoutTemplate[] = [
  {
    id: "beginner-full-body",
    name: "Beginner Full Body",
    description: "Perfect starter workout hitting all major muscle groups",
    duration: 30,
    difficulty: "beginner",
    category: "strength",
    exercises: [
      { exerciseId: "push-ups", sets: 3, reps: 8, restTime: 60 },
      { exerciseId: "squats", sets: 3, reps: 12, restTime: 60 },
      { exerciseId: "plank", sets: 3, duration: 30, restTime: 60 },
      { exerciseId: "lunges", sets: 2, reps: 8, restTime: 60 },
    ],
    calories: 150,
    tags: ["full-body", "beginner", "no-equipment"],
  },
  {
    id: "cardio-hiit",
    name: "Quick HIIT Cardio",
    description: "High-intensity interval training for maximum calorie burn",
    duration: 20,
    difficulty: "intermediate",
    category: "hiit",
    exercises: [
      { exerciseId: "jumping-jacks", sets: 4, duration: 45, restTime: 15 },
      { exerciseId: "burpees", sets: 4, duration: 30, restTime: 30 },
      { exerciseId: "squats", sets: 4, duration: 45, restTime: 15 },
    ],
    calories: 200,
    tags: ["hiit", "cardio", "fat-burn", "quick"],
  },
  {
    id: "strength-upper",
    name: "Upper Body Strength",
    description: "Focus on building upper body strength and muscle",
    duration: 45,
    difficulty: "intermediate",
    category: "strength",
    exercises: [
      { exerciseId: "push-ups", sets: 4, reps: 12, restTime: 90 },
      { exerciseId: "plank", sets: 3, duration: 45, restTime: 60 },
    ],
    calories: 180,
    tags: ["upper-body", "strength", "muscle-building"],
  },
];

export const mealTemplates: MealTemplate[] = [
  {
    id: "protein-smoothie",
    name: "Protein Power Smoothie",
    description: "Perfect post-workout recovery drink packed with protein",
    category: "breakfast",
    prepTime: 5,
    servings: 1,
    nutrition: {
      calories: 320,
      protein: 25,
      carbs: 35,
      fat: 8,
      fiber: 6,
      sugar: 28,
    },
    ingredients: [
      { name: "Banana", amount: 1, unit: "medium" },
      { name: "Protein powder", amount: 1, unit: "scoop" },
      { name: "Almond milk", amount: 250, unit: "ml" },
      { name: "Spinach", amount: 1, unit: "cup" },
      { name: "Berries", amount: 0.5, unit: "cup" },
    ],
    instructions: [
      "Add all ingredients to blender",
      "Blend until smooth",
      "Serve immediately",
    ],
    tags: ["post-workout", "protein", "quick", "healthy"],
  },
  {
    id: "quinoa-bowl",
    name: "Mediterranean Quinoa Bowl",
    description: "Nutrient-dense bowl with complete proteins and healthy fats",
    category: "lunch",
    prepTime: 25,
    servings: 2,
    nutrition: {
      calories: 450,
      protein: 18,
      carbs: 52,
      fat: 18,
      fiber: 8,
      sugar: 6,
    },
    ingredients: [
      { name: "Quinoa", amount: 1, unit: "cup" },
      { name: "Chickpeas", amount: 0.5, unit: "cup" },
      { name: "Cucumber", amount: 1, unit: "medium" },
      { name: "Cherry tomatoes", amount: 1, unit: "cup" },
      { name: "Feta cheese", amount: 50, unit: "g" },
      { name: "Olive oil", amount: 2, unit: "tbsp" },
      { name: "Lemon juice", amount: 1, unit: "tbsp" },
    ],
    instructions: [
      "Cook quinoa according to package instructions",
      "Dice cucumber and halve cherry tomatoes",
      "Mix olive oil and lemon juice for dressing",
      "Combine all ingredients and toss with dressing",
    ],
    tags: ["mediterranean", "vegetarian", "complete-protein", "fiber-rich"],
  },
  {
    id: "grilled-salmon",
    name: "Grilled Salmon with Vegetables",
    description: "Omega-3 rich salmon with colorful roasted vegetables",
    category: "dinner",
    prepTime: 30,
    servings: 2,
    nutrition: {
      calories: 380,
      protein: 32,
      carbs: 20,
      fat: 20,
      fiber: 6,
      sugar: 12,
    },
    ingredients: [
      { name: "Salmon fillet", amount: 200, unit: "g" },
      { name: "Broccoli", amount: 1, unit: "cup" },
      { name: "Bell peppers", amount: 1, unit: "cup" },
      { name: "Sweet potato", amount: 1, unit: "medium" },
      { name: "Olive oil", amount: 1, unit: "tbsp" },
    ],
    instructions: [
      "Preheat oven to 200°C",
      "Cut vegetables and toss with olive oil",
      "Roast vegetables for 20 minutes",
      "Grill salmon for 4-5 minutes per side",
      "Serve together",
    ],
    tags: ["omega-3", "high-protein", "low-carb", "anti-inflammatory"],
  },
  {
    id: "energy-balls",
    name: "No-Bake Energy Balls",
    description: "Perfect pre-workout snack for sustained energy",
    category: "snack",
    prepTime: 15,
    servings: 12,
    nutrition: {
      calories: 95,
      protein: 3,
      carbs: 12,
      fat: 4,
      fiber: 2,
      sugar: 8,
    },
    ingredients: [
      { name: "Dates", amount: 1, unit: "cup" },
      { name: "Almonds", amount: 0.5, unit: "cup" },
      { name: "Oats", amount: 0.5, unit: "cup" },
      { name: "Chia seeds", amount: 1, unit: "tbsp" },
      { name: "Vanilla extract", amount: 0.5, unit: "tsp" },
    ],
    instructions: [
      "Process dates until paste-like",
      "Add almonds and pulse until chopped",
      "Mix in oats, chia seeds, and vanilla",
      "Roll into 12 balls",
      "Chill for 30 minutes",
    ],
    tags: ["pre-workout", "natural", "energy", "no-bake"],
  },
];

export const getExerciseById = (id: string): Exercise | undefined => {
  return sampleExercises.find((exercise) => exercise.id === id);
};

export const getWorkoutsByDifficulty = (difficulty: string) => {
  return workoutTemplates.filter(
    (workout) => workout.difficulty === difficulty,
  );
};

export const getWorkoutsByCategory = (category: string) => {
  return workoutTemplates.filter((workout) => workout.category === category);
};

export const getMealsByCategory = (category: string) => {
  return mealTemplates.filter((meal) => meal.category === category);
};

export const calculateWorkoutCalories = (
  workoutId: string,
  userWeight: number = 70,
): number => {
  const workout = workoutTemplates.find((w) => w.id === workoutId);
  if (!workout) return 0;

  // Basic calorie calculation based on workout type and duration
  const baseCaloriesPerMinute = {
    strength: 6,
    cardio: 8,
    hiit: 10,
    flexibility: 3,
    sports: 7,
  };

  const caloriesPerMinute = baseCaloriesPerMinute[workout.category] || 5;
  return Math.round(caloriesPerMinute * workout.duration * (userWeight / 70));
};
