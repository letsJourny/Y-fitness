import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  Target,
  Award,
  Activity,
  Flame,
  Scale,
  Clock,
} from "lucide-react";
import {
  WorkoutLog,
  MealLog,
  BodyMetrics,
  Achievement,
  calculateWeeklyStats,
  calculateMonthlyStats,
  getProgressTrend,
  formatDate,
  formatDuration,
} from "@/utils/progressUtils";

interface ProgressAnalyticsProps {
  workoutLogs: WorkoutLog[];
  mealLogs: MealLog[];
  bodyMetrics: BodyMetrics[];
  achievements: Achievement[];
}

export default function ProgressAnalytics({
  workoutLogs,
  mealLogs,
  bodyMetrics,
  achievements,
}: ProgressAnalyticsProps) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Calculate current week stats
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
  const weekStats = calculateWeeklyStats(
    workoutLogs,
    startOfWeek.toISOString().split("T")[0],
  );

  // Calculate monthly stats
  const monthStats = calculateMonthlyStats(
    workoutLogs,
    mealLogs,
    currentMonth,
    currentYear,
  );

  // Get recent workouts
  const recentWorkouts = workoutLogs
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // Calculate progress trends
  const weightTrend = getProgressTrend(bodyMetrics, "weight");
  const bodyFatTrend = getProgressTrend(bodyMetrics, "bodyFat");

  // Achievement progress
  const unlockedAchievements = achievements.filter((a) => a.unlockedAt);
  const inProgressAchievements = achievements.filter(
    (a) => !a.unlockedAt && a.progress !== undefined,
  );

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "decreasing":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getAchievementProgress = (achievement: Achievement) => {
    if (!achievement.progress) return 0;
    return Math.min(
      100,
      (achievement.progress / achievement.requirement.value) * 100,
    );
  };

  return (
    <div className="space-y-6">
      {/* Weekly Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  This Week
                </p>
                <div className="text-2xl font-bold text-primary">
                  {weekStats.totalWorkouts}
                </div>
                <p className="text-xs text-muted-foreground">Workouts</p>
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
                  Time Active
                </p>
                <div className="text-2xl font-bold text-green-600">
                  {formatDuration(weekStats.totalDuration)}
                </div>
                <p className="text-xs text-muted-foreground">This week</p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Calories Burned
                </p>
                <div className="text-2xl font-bold text-orange-600">
                  {weekStats.totalCalories}
                </div>
                <p className="text-xs text-muted-foreground">This week</p>
              </div>
              <Flame className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Avg Rating
                </p>
                <div className="text-2xl font-bold text-yellow-600">
                  {weekStats.avgRating.toFixed(1)}
                </div>
                <p className="text-xs text-muted-foreground">Out of 5.0</p>
              </div>
              <Award className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="w-5 h-5" />
              Body Metrics Trends
            </CardTitle>
            <CardDescription>
              Track your physical progress over time
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {bodyMetrics.length > 0 ? (
              <>
                {weightTrend.trend !== "stable" && (
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      {getTrendIcon(weightTrend.trend)}
                      <span className="font-medium">Weight</span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">
                        {weightTrend.change > 0 ? "+" : ""}
                        {weightTrend.change.toFixed(1)}kg
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {weightTrend.percentChange?.toFixed(1)}% change
                      </div>
                    </div>
                  </div>
                )}

                {bodyFatTrend.trend !== "stable" && (
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      {getTrendIcon(bodyFatTrend.trend)}
                      <span className="font-medium">Body Fat</span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">
                        {bodyFatTrend.change > 0 ? "+" : ""}
                        {bodyFatTrend.change.toFixed(1)}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {bodyFatTrend.percentChange?.toFixed(1)}% change
                      </div>
                    </div>
                  </div>
                )}

                <Button variant="outline" className="w-full">
                  <Target className="w-4 h-4 mr-2" />
                  Update Body Metrics
                </Button>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Scale className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No body metrics recorded yet</p>
                <Button className="mt-4">Add First Measurement</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Achievements
            </CardTitle>
            <CardDescription>
              Your fitness milestones and progress
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Unlocked Achievements */}
            {unlockedAchievements.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-green-600">
                  🎉 Unlocked ({unlockedAchievements.length})
                </h4>
                {unlockedAchievements.slice(0, 2).map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-3 p-2 bg-green-50 rounded-lg"
                  >
                    <span className="text-lg">{achievement.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-green-800">
                        {achievement.name}
                      </div>
                      <div className="text-xs text-green-600">
                        {achievement.description}
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      ✓
                    </Badge>
                  </div>
                ))}
              </div>
            )}

            {/* In Progress Achievements */}
            {inProgressAchievements.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-blue-600">
                  📈 In Progress ({inProgressAchievements.length})
                </h4>
                {inProgressAchievements.slice(0, 2).map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg"
                  >
                    <span className="text-lg opacity-70">
                      {achievement.icon}
                    </span>
                    <div className="flex-1">
                      <div className="font-medium text-blue-800">
                        {achievement.name}
                      </div>
                      <div className="text-xs text-blue-600">
                        {achievement.progress}/{achievement.requirement.value}{" "}
                        {achievement.requirement.metric}
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full transition-all"
                          style={{
                            width: `${getAchievementProgress(achievement)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Button variant="outline" className="w-full">
              <Award className="w-4 h-4 mr-2" />
              View All Achievements
            </Button>
          </CardContent>
        </Card>
      </div>

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
          {recentWorkouts.length > 0 ? (
            <div className="space-y-3">
              {recentWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="font-medium">{workout.workoutName}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(workout.date)} • {workout.duration}m •{" "}
                      {workout.exercises.length} exercises
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">
                      {workout.totalCalories}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      calories
                    </div>
                  </div>
                  {workout.rating && (
                    <div className="flex items-center gap-1 ml-4">
                      {Array.from({ length: workout.rating }).map((_, i) => (
                        <span key={i} className="text-yellow-400 text-sm">
                          ⭐
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No workouts logged yet</p>
              <Button className="mt-4">Log Your First Workout</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Monthly Calendar Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Calendar</CardTitle>
          <CardDescription>
            Your workout and meal logging consistency for{" "}
            {currentDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="font-medium text-muted-foreground p-2">
                {day}
              </div>
            ))}

            {Array.from({ length: 31 }, (_, i) => {
              const day = i + 1;
              const hasWorkout = monthStats.workouts.byDay[day] > 0;
              const hasMeal = monthStats.meals.byDay[day] > 0;

              return (
                <div
                  key={day}
                  className={`
                    aspect-square flex items-center justify-center rounded text-xs
                    ${
                      hasWorkout && hasMeal
                        ? "bg-green-500 text-white"
                        : hasWorkout
                          ? "bg-blue-500 text-white"
                          : hasMeal
                            ? "bg-yellow-500 text-white"
                            : "bg-muted text-muted-foreground"
                    }
                  `}
                >
                  {day}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-4 mt-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Workout + Meal</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Workout only</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span>Meal only</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-muted rounded"></div>
              <span>No activity</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
