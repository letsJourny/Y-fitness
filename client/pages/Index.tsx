import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import {
  Dumbbell,
  Apple,
  BarChart3,
  Target,
  Clock,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Trophy,
  Heart,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  const features = [
    {
      icon: Dumbbell,
      title: "Workout Tracking",
      description:
        "Track your workouts with detailed exercise logs, progress photos, and performance metrics.",
    },
    {
      icon: Apple,
      title: "Meal Logging",
      description:
        "Log your meals with nutritional information, calorie counting, and macro tracking.",
    },
    {
      icon: BarChart3,
      title: "Progress Dashboard",
      description:
        "Visualize your fitness journey with comprehensive charts and progress analytics.",
    },
  ];

  const benefits = [
    {
      icon: Target,
      title: "Personalized Plans",
      description:
        "Get custom workout and nutrition plans tailored to your specific goals and preferences.",
    },
    {
      icon: Clock,
      title: "Time Efficient",
      description:
        "Quick 20-30 minute workouts that fit into your busy schedule.",
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description:
        "Access to certified trainers and nutritionists for professional support.",
    },
    {
      icon: Trophy,
      title: "Proven Results",
      description:
        "Join thousands of users who have achieved their fitness goals with our platform.",
    },
    {
      icon: Heart,
      title: "Health Focused",
      description:
        "Holistic approach to wellness including mental health and lifestyle improvements.",
    },
    {
      icon: Zap,
      title: "Fast Results",
      description:
        "See measurable improvements in strength, endurance, and body composition.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Busy Professional",
      image: "/placeholder.svg",
      rating: 5,
      text: "FitPro transformed my lifestyle! I lost 20 pounds in 3 months while building strength. The personalized plans fit perfectly into my hectic schedule.",
    },
    {
      name: "Mike Chen",
      role: "Fitness Enthusiast",
      image: "/placeholder.svg",
      rating: 5,
      text: "The workout tracking features are incredible. I've never been more motivated to hit the gym. My progress charts show consistent improvement every week.",
    },
    {
      name: "Emily Rodriguez",
      role: "New Mom",
      image: "/placeholder.svg",
      rating: 5,
      text: "Post-pregnancy fitness felt overwhelming until I found FitPro. The nutrition guidance and flexible workouts helped me regain my confidence and energy.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                  Transform Your
                  <span className="text-primary"> Fitness Journey</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Get personalized workout and nutrition plans that adapt to
                  your lifestyle. Track progress, stay motivated, and achieve
                  lasting results.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/registration">
                  <Button size="lg" className="text-lg px-8 py-6">
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">50K+</div>
                  <div className="text-sm text-muted-foreground">
                    Active Users
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">95%</div>
                  <div className="text-sm text-muted-foreground">
                    Success Rate
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">4.9</div>
                  <div className="text-sm text-muted-foreground">
                    App Rating
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-card rounded-3xl p-8 shadow-2xl border">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Today's Progress</h3>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Workouts</span>
                      <span className="font-semibold">3/3 ✓</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-full"></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Calories</span>
                      <span className="font-semibold">1,847/2,100</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-4/5"></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Steps</span>
                      <span className="font-semibold">8,342/10,000</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-4/5"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-accent/30 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools and guidance you
              need to achieve your fitness goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Why Choose FitPro?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join the fitness revolution with science-backed methods and
              personalized guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-6 rounded-2xl hover:bg-muted/50 transition-colors"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real results from real people who transformed their lives with
              FitPro.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <blockquote className="text-muted-foreground italic">
                    "{testimonial.text}"
                  </blockquote>

                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full bg-muted"
                    />
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-primary/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground">
            Ready to Start Your Transformation?
          </h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Join thousands of users who have already transformed their lives.
            Get started with your personalized fitness plan today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/registration">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
            >
              Learn More
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-8 pt-8">
            <div className="flex items-center space-x-2 text-primary-foreground/90">
              <CheckCircle className="w-5 h-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2 text-primary-foreground/90">
              <CheckCircle className="w-5 h-5" />
              <span>7-day free trial</span>
            </div>
            <div className="flex items-center space-x-2 text-primary-foreground/90">
              <CheckCircle className="w-5 h-5" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">
                  FitPro
                </span>
              </div>
              <p className="text-muted-foreground">
                Transform your fitness journey with personalized plans and
                expert guidance.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Product</h4>
              <div className="space-y-2">
                <Link
                  to="/#features"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  Features
                </Link>
                <Link
                  to="/plans"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  Plans
                </Link>
                <Link
                  to="/subscription"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  Pricing
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Company</h4>
              <div className="space-y-2">
                <a
                  href="#about"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </a>
                <a
                  href="#contact"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </a>
                <a
                  href="#careers"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  Careers
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Legal</h4>
              <div className="space-y-2">
                <a
                  href="#privacy"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#terms"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#support"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  Support
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 FitPro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
