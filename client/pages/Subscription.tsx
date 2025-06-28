import Navigation from "@/components/Navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, FileText, Check, Crown, Star } from "lucide-react";

export default function Subscription() {
  const plans = [
    {
      name: "Monthly",
      price: "15",
      period: "month",
      popular: false,
      features: [
        "All workout plans",
        "Meal tracking",
        "Progress analytics",
        "Email support",
      ],
    },
    {
      name: "Quarterly",
      price: "12",
      period: "month",
      popular: true,
      savings: "20% off",
      features: [
        "All monthly features",
        "Priority support",
        "Custom meal plans",
        "1-on-1 consultation",
      ],
    },
    {
      name: "Yearly",
      price: "8",
      period: "month",
      popular: false,
      savings: "47% off",
      features: [
        "All quarterly features",
        "Personal trainer chat",
        "Advanced analytics",
        "Nutrition coaching",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Subscription Plans
          </h1>
          <p className="text-muted-foreground">
            Choose the perfect plan for your fitness journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${plan.popular ? "border-primary ring-2 ring-primary/20" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  {plan.name === "Yearly" && (
                    <Crown className="w-5 h-5 text-primary" />
                  )}
                  {plan.name}
                </CardTitle>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">
                    {plan.price} KWD
                    <span className="text-sm font-normal text-muted-foreground">
                      /{plan.period}
                    </span>
                  </div>
                  {plan.savings && (
                    <Badge variant="secondary">{plan.savings}</Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Check className="w-4 h-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                >
                  Choose Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Payment Method
              </CardTitle>
              <CardDescription>Manage your payment information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
                <p className="text-muted-foreground">
                  Secure payment processing with multiple payment options
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Billing History
              </CardTitle>
              <CardDescription>
                View your invoices and subscription history
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
                <p className="text-muted-foreground">
                  Download invoices and view detailed billing history
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
