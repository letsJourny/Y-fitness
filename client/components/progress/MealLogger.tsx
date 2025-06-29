import { useState } from "react";
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
import { Save, Utensils, Plus, Calculator } from "lucide-react";
import { mealTemplates } from "@/utils/workoutData";
import { MealLog } from "@/utils/progressUtils";

interface MealLoggerProps {
  onSave: (mealLog: MealLog) => void;
  onCancel: () => void;
}

export default function MealLogger({ onSave, onCancel }: MealLoggerProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [mealName, setMealName] = useState("");
  const [mealType, setMealType] = useState<
    "breakfast" | "lunch" | "dinner" | "snack"
  >("breakfast");
  const [nutrition, setNutrition] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
  });
  const [notes, setNotes] = useState("");

  const handleTemplateSelect = (templateId: string) => {
    const template = mealTemplates.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setMealName(template.name);
      setMealType(template.category);
      setNutrition(template.nutrition);
    }
  };

  const updateNutrition = (field: keyof typeof nutrition, value: number) => {
    setNutrition((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateMacroPercentages = () => {
    const { calories, protein, carbs, fat } = nutrition;
    if (calories === 0) return { protein: 0, carbs: 0, fat: 0 };

    const proteinCal = protein * 4;
    const carbsCal = carbs * 4;
    const fatCal = fat * 9;

    return {
      protein: Math.round((proteinCal / calories) * 100),
      carbs: Math.round((carbsCal / calories) * 100),
      fat: Math.round((fatCal / calories) * 100),
    };
  };

  const handleSave = () => {
    if (!mealName.trim()) {
      const event = new CustomEvent("showToast", {
        detail: {
          message: "Please enter a meal name",
          type: "error",
        },
      });
      window.dispatchEvent(event);
      return;
    }

    if (nutrition.calories === 0) {
      const event = new CustomEvent("showToast", {
        detail: {
          message: "Please enter calorie information",
          type: "error",
        },
      });
      window.dispatchEvent(event);
      return;
    }

    const mealLog: MealLog = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      mealType,
      mealTemplateId: selectedTemplate || undefined,
      mealName,
      nutrition,
      notes: notes || undefined,
    };

    onSave(mealLog);
  };

  const macroPercentages = calculateMacroPercentages();

  const getMealTypeIcon = (type: string) => {
    switch (type) {
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="w-5 h-5" />
            Log Your Meal
          </CardTitle>
          <CardDescription>
            Track your food intake and nutritional information
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
                  <SelectValue placeholder="Choose a meal template" />
                </SelectTrigger>
                <SelectContent>
                  {mealTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {getMealTypeIcon(template.category)} {template.name} (
                      {template.nutrition.calories} cal)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mealType">Meal Type</Label>
              <Select
                value={mealType}
                onValueChange={(value: any) => setMealType(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">🌅 Breakfast</SelectItem>
                  <SelectItem value="lunch">☀️ Lunch</SelectItem>
                  <SelectItem value="dinner">🌙 Dinner</SelectItem>
                  <SelectItem value="snack">🍎 Snack</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mealName">Meal Name</Label>
            <Input
              id="mealName"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              placeholder="Enter meal name"
            />
          </div>
        </CardContent>
      </Card>

      {/* Nutrition Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Nutritional Information
          </CardTitle>
          <CardDescription>
            Enter the nutritional details for your meal
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Main Macros */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="calories" className="text-sm font-medium">
                Calories
              </Label>
              <Input
                id="calories"
                type="number"
                value={nutrition.calories || ""}
                onChange={(e) =>
                  updateNutrition("calories", parseInt(e.target.value) || 0)
                }
                placeholder="0"
                min="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="protein" className="text-sm font-medium">
                Protein (g)
              </Label>
              <Input
                id="protein"
                type="number"
                value={nutrition.protein || ""}
                onChange={(e) =>
                  updateNutrition("protein", parseFloat(e.target.value) || 0)
                }
                placeholder="0"
                min="0"
                step="0.1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="carbs" className="text-sm font-medium">
                Carbs (g)
              </Label>
              <Input
                id="carbs"
                type="number"
                value={nutrition.carbs || ""}
                onChange={(e) =>
                  updateNutrition("carbs", parseFloat(e.target.value) || 0)
                }
                placeholder="0"
                min="0"
                step="0.1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fat" className="text-sm font-medium">
                Fat (g)
              </Label>
              <Input
                id="fat"
                type="number"
                value={nutrition.fat || ""}
                onChange={(e) =>
                  updateNutrition("fat", parseFloat(e.target.value) || 0)
                }
                placeholder="0"
                min="0"
                step="0.1"
              />
            </div>
          </div>

          {/* Macro Breakdown */}
          {nutrition.calories > 0 && (
            <div className="p-4 bg-muted/30 rounded-lg">
              <h4 className="text-sm font-medium mb-3">Macro Breakdown</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">
                    {macroPercentages.protein}%
                  </div>
                  <div className="text-xs text-muted-foreground">Protein</div>
                  <div className="text-xs">
                    {nutrition.protein}g = {nutrition.protein * 4} cal
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">
                    {macroPercentages.carbs}%
                  </div>
                  <div className="text-xs text-muted-foreground">Carbs</div>
                  <div className="text-xs">
                    {nutrition.carbs}g = {nutrition.carbs * 4} cal
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-yellow-600">
                    {macroPercentages.fat}%
                  </div>
                  <div className="text-xs text-muted-foreground">Fat</div>
                  <div className="text-xs">
                    {nutrition.fat}g = {nutrition.fat * 9} cal
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Additional Nutrients */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fiber" className="text-sm font-medium">
                Fiber (g)
              </Label>
              <Input
                id="fiber"
                type="number"
                value={nutrition.fiber || ""}
                onChange={(e) =>
                  updateNutrition("fiber", parseFloat(e.target.value) || 0)
                }
                placeholder="0"
                min="0"
                step="0.1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sugar" className="text-sm font-medium">
                Sugar (g)
              </Label>
              <Input
                id="sugar"
                type="number"
                value={nutrition.sugar || ""}
                onChange={(e) =>
                  updateNutrition("sugar", parseFloat(e.target.value) || 0)
                }
                placeholder="0"
                min="0"
                step="0.1"
              />
            </div>
          </div>

          {/* Quick Add Buttons */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Quick Estimates</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setNutrition({
                    calories: 300,
                    protein: 20,
                    carbs: 30,
                    fat: 12,
                    fiber: 5,
                    sugar: 8,
                  });
                }}
              >
                Light Meal (300 cal)
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setNutrition({
                    calories: 500,
                    protein: 30,
                    carbs: 45,
                    fat: 18,
                    fiber: 8,
                    sugar: 12,
                  });
                }}
              >
                Regular Meal (500 cal)
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setNutrition({
                    calories: 150,
                    protein: 5,
                    carbs: 20,
                    fat: 6,
                    fiber: 3,
                    sugar: 15,
                  });
                }}
              >
                Snack (150 cal)
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about the meal, cooking method, or how you felt..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        <Button onClick={handleSave} className="flex-1">
          <Save className="w-4 h-4 mr-2" />
          Save Meal
        </Button>
        <Button onClick={onCancel} variant="outline">
          Cancel
        </Button>
      </div>
    </div>
  );
}
