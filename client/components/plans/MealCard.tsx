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
import { Clock, Users, Plus, Calendar, ChefHat, Info } from "lucide-react";
import { MealTemplate } from "@/utils/workoutData";

interface MealCardProps {
  meal: MealTemplate;
  onAddToLog?: (mealId: string) => void;
  onSchedule?: (mealId: string) => void;
  onViewRecipe?: (mealId: string) => void;
}

export default function MealCard({
  meal,
  onAddToLog,
  onSchedule,
  onViewRecipe,
}: MealCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "breakfast":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "lunch":
        return "bg-green-100 text-green-800 border-green-200";
      case "dinner":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "snack":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "breakfast":
        return "🌅";
      case "lunch":
        return "☀️";
      case "dinner":
        return "🌙";
      case "snack":
        return "🍎";
      default:
        return "🍽️";
    }
  };

  const { calories, protein, carbs, fat, fiber } = meal.nutrition;

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200 border border-border">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <span className="text-xl">{getCategoryIcon(meal.category)}</span>
              {meal.name}
            </CardTitle>
            <CardDescription className="text-sm">
              {meal.description}
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className={`ml-2 ${getCategoryColor(meal.category)}`}
          >
            {meal.category}
          </Badge>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{meal.prepTime}m prep</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{meal.servings} servings</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat className="w-4 h-4" />
            <span>{meal.ingredients.length} ingredients</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Nutrition Facts */}
        <div className="grid grid-cols-2 gap-4 p-3 bg-muted/30 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{calories}</div>
            <div className="text-xs text-muted-foreground">Calories</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">{protein}g</div>
            <div className="text-xs text-muted-foreground">Protein</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{carbs}g</div>
            <div className="text-xs text-muted-foreground">Carbs</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-600">{fat}g</div>
            <div className="text-xs text-muted-foreground">Fat</div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {meal.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {meal.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{meal.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Ingredients Preview */}
        {isExpanded && (
          <div className="space-y-2 border-t pt-4">
            <h4 className="text-sm font-medium">Ingredients:</h4>
            <div className="space-y-1">
              {meal.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm bg-muted/30 p-2 rounded"
                >
                  <span className="font-medium">{ingredient.name}</span>
                  <span className="text-muted-foreground">
                    {ingredient.amount} {ingredient.unit}
                  </span>
                </div>
              ))}
            </div>

            {meal.instructions.length > 0 && (
              <div className="mt-3">
                <h4 className="text-sm font-medium mb-2">Quick Steps:</h4>
                <ol className="space-y-1 text-sm text-muted-foreground">
                  {meal.instructions.slice(0, 3).map((step, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="font-medium text-primary">
                        {index + 1}.
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                  {meal.instructions.length > 3 && (
                    <li className="text-xs italic">
                      ...and {meal.instructions.length - 3} more steps
                    </li>
                  )}
                </ol>
              </div>
            )}
          </div>
        )}

        {/* Additional Nutrition Info */}
        {fiber > 0 && (
          <div className="flex items-center justify-between text-sm p-2 bg-green-50 rounded">
            <span className="text-green-800">High in Fiber</span>
            <span className="font-medium text-green-700">{fiber}g</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button className="flex-1" onClick={() => onAddToLog?.(meal.id)}>
            <Plus className="w-4 h-4 mr-2" />
            Add to Log
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onSchedule?.(meal.id)}
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
