import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
  Mail,
  Phone,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/utils/translations";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FormError } from "@/components/ui/form-error";
import { showToast } from "@/components/ui/toast-notification";
import { validateContactForm, ValidationError } from "@/utils/validation";
import { api, ApiError } from "@/utils/api";
import { useState } from "react";

export default function Index() {
  const { language } = useLanguage();
  const t = getTranslation(language);

  // Contact form state
  const [contactFormData, setContactFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactErrors, setContactErrors] = useState<ValidationError[]>([]);

  const handleContactInputChange = (field: string, value: string) => {
    setContactFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-specific errors when user starts typing
    if (contactErrors.length > 0) {
      setContactErrors((prev) => prev.filter((error) => error.field !== field));
    }
  };

  const getContactFieldError = (fieldName: string) => {
    return contactErrors.find((error) => error.field === fieldName)?.message;
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    setContactErrors([]);

    try {
      // Validate form
      const validation = validateContactForm(contactFormData);
      if (!validation.isValid) {
        setContactErrors(validation.errors);
        showToast({
          type: "error",
          title: "Validation Error",
          message: "Please fix the errors below and try again.",
        });
        return;
      }

      // Call real API
      const response = await api.contact(contactFormData);

      showToast({
        type: "success",
        title: "Message Sent!",
        message:
          response.message ||
          "Thank you for your message. We'll get back to you within 24 hours.",
      });

      // Reset form
      setContactFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "General Inquiry",
        message: "",
      });
    } catch (error) {
      if (error instanceof ApiError && error.details) {
        // Server validation errors
        const serverErrors = error.details.map((detail) => ({
          field: detail.field,
          message: detail.message,
        }));
        setContactErrors(serverErrors);
      }

      showToast({
        type: "error",
        title: "Message Failed",
        message:
          error instanceof ApiError
            ? error.message
            : "An unexpected error occurred.",
      });
    } finally {
      setContactLoading(false);
    }
  };
  const features = [
    {
      icon: Dumbbell,
      title: t.landing.workoutTracking,
      description: t.landing.workoutTrackingDesc,
    },
    {
      icon: Apple,
      title: t.landing.mealLogging,
      description: t.landing.mealLoggingDesc,
    },
    {
      icon: BarChart3,
      title: t.landing.progressDashboard,
      description: t.landing.progressDashboardDesc,
    },
  ];

  const benefits = [
    {
      icon: Target,
      title: t.landing.personalizedPlans,
      description: t.landing.personalizedPlansDesc,
    },
    {
      icon: Clock,
      title: t.landing.timeEfficient,
      description: t.landing.timeEfficientDesc,
    },
    {
      icon: Users,
      title: t.landing.expertGuidance,
      description: t.landing.expertGuidanceDesc,
    },
    {
      icon: Trophy,
      title: t.landing.provenResults,
      description: t.landing.provenResultsDesc,
    },
    {
      icon: Heart,
      title: t.landing.healthFocused,
      description: t.landing.healthFocusedDesc,
    },
    {
      icon: Zap,
      title: t.landing.fastResults,
      description: t.landing.fastResultsDesc,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Busy Professional",
      image: "/placeholder.svg",
      rating: 5,
      text: "Yousef Recharge transformed my lifestyle! I lost 20 pounds in 3 months while building strength. The personalized plans fit perfectly into my hectic schedule.",
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
      text: "Post-pregnancy fitness felt overwhelming until I found Yousef Recharge. The nutrition guidance and flexible workouts helped me regain my confidence and energy.",
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
                  {t.landing.heroTitle}
                  <span className="text-primary">
                    {t.landing.heroTitleHighlight}
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  {t.landing.heroSubtitle}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/registration">
                  <Button size="lg" className="text-lg px-8 py-6">
                    {t.landing.getStartedFree}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6"
                >
                  <Play className="mr-2 w-5 h-5" />
                  {t.landing.watchDemo}
                </Button>
              </div>

              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">50K+</div>
                  <div className="text-sm text-muted-foreground">
                    {t.landing.activeUsers}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">95%</div>
                  <div className="text-sm text-muted-foreground">
                    {t.landing.successRate}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">4.9</div>
                  <div className="text-sm text-muted-foreground">
                    {t.landing.appRating}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Hero Image with Overlay */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 via-primary/30 to-primary/40">
                  <div className="w-full h-full flex items-center justify-center relative">
                    {/* Fitness Icons Grid */}
                    <div className="grid grid-cols-3 gap-8">
                      <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <Dumbbell className="w-8 h-8 text-primary" />
                      </div>
                      <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <Target className="w-8 h-8 text-primary" />
                      </div>
                      <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <Trophy className="w-8 h-8 text-primary" />
                      </div>
                      <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <Heart className="w-8 h-8 text-primary" />
                      </div>
                      <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <Zap className="w-8 h-8 text-primary" />
                      </div>
                      <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <BarChart3 className="w-8 h-8 text-primary" />
                      </div>
                    </div>

                    {/* Central Focus Element */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center backdrop-blur-lg border border-primary/20">
                        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                          <Play className="w-10 h-10 text-primary-foreground ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overlay Text */}
                <div className="absolute bottom-6 left-6 right-6 text-center">
                  <div className="bg-background/95 backdrop-blur-sm rounded-2xl p-4 border">
                    <p className="text-sm font-medium text-foreground">
                      Start your transformation today
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Join thousands achieving their fitness goals
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-accent/30 rounded-full blur-2xl"></div>
              <div className="absolute top-1/2 -left-4 w-12 h-12 bg-primary/30 rounded-full blur-lg"></div>
              <div className="absolute bottom-1/4 -right-6 w-20 h-20 bg-accent/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              {t.landing.featuresTitle}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t.landing.featuresSubtitle}
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
              {t.landing.benefitsTitle}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t.landing.benefitsSubtitle}
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
              {t.landing.testimonialsTitle}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t.landing.testimonialsSubtitle}
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

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Choose Your Plan
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Start your fitness transformation with our flexible pricing plans
              designed for every lifestyle and budget.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Monthly Plan */}
            <Card className="relative">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-foreground">
                    Monthly
                  </h3>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-foreground">
                      15 KWD
                      <span className="text-lg font-normal text-muted-foreground">
                        /month
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Perfect for getting started
                    </p>
                  </div>

                  <ul className="space-y-3 text-left">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">All workout plans</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Meal tracking & logging</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Progress analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Email support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Mobile app access</span>
                    </li>
                  </ul>

                  <Link to="/registration" className="block">
                    <Button variant="outline" className="w-full" size="lg">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Quarterly Plan - Popular */}
            <Card className="relative border-primary ring-2 ring-primary/20">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Most Popular
                </div>
              </div>

              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-foreground">
                    Quarterly
                  </h3>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-foreground">
                      12 KWD
                      <span className="text-lg font-normal text-muted-foreground">
                        /month
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm line-through text-muted-foreground">
                        15 KWD
                      </span>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        20% off
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Best value for commitment
                    </p>
                  </div>

                  <ul className="space-y-3 text-left">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Everything in Monthly</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Priority support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Custom meal plans</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">1-on-1 consultation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Progress photos review</span>
                    </li>
                  </ul>

                  <Link to="/registration" className="block">
                    <Button className="w-full" size="lg">
                      Start Free Trial
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Yearly Plan */}
            <Card className="relative">
              <div className="absolute -top-3 right-4">
                <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
                  Best Value
                </div>
              </div>

              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-foreground">Yearly</h3>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-foreground">
                      8 KWD
                      <span className="text-lg font-normal text-muted-foreground">
                        /month
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm line-through text-muted-foreground">
                        15 KWD
                      </span>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        47% off
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Maximum savings & features
                    </p>
                  </div>

                  <ul className="space-y-3 text-left">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Everything in Quarterly</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Personal trainer chat</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Advanced analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Nutrition coaching</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">VIP community access</span>
                    </li>
                  </ul>

                  <Link to="/registration" className="block">
                    <Button variant="outline" className="w-full" size="lg">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pricing FAQ */}
          <div className="text-center space-y-8">
            <h3 className="text-2xl font-bold text-foreground">
              Frequently Asked Questions
            </h3>

            <div className="grid md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">
                  Can I cancel anytime?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Yes! You can cancel your subscription at any time from your
                  account settings. No hidden fees or cancellation charges.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">
                  Is there a free trial?
                </h4>
                <p className="text-sm text-muted-foreground">
                  All plans come with a 7-day free trial. No credit card
                  required to start your trial period.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">
                  What payment methods do you accept?
                </h4>
                <p className="text-sm text-muted-foreground">
                  We accept all major credit cards, PayPal, and local payment
                  methods including K-Net for Kuwait customers.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">
                  Can I change my plan later?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Absolutely! You can upgrade or downgrade your plan at any
                  time. Changes will be prorated automatically.
                </p>
              </div>
            </div>

            <div className="bg-muted/50 rounded-2xl p-8">
              <h4 className="text-xl font-bold text-foreground mb-4">
                Still have questions?
              </h4>
              <p className="text-muted-foreground mb-6">
                Our support team is here to help you choose the perfect plan for
                your fitness goals.
              </p>
              <Button variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-primary/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground">
            {t.landing.ctaTitle}
          </h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            {t.landing.ctaSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/registration">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6"
              >
                {t.landing.startFreeTrial}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-primary-foreground/20 hover:bg-primary-foreground/10 hover:text-primary"
            >
              {t.landing.learnMore}
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-8 pt-8">
            <div className="flex items-center space-x-2 text-primary-foreground/90">
              <CheckCircle className="w-5 h-5" />
              <span>{t.landing.noCreditCard}</span>
            </div>
            <div className="flex items-center space-x-2 text-primary-foreground/90">
              <CheckCircle className="w-5 h-5" />
              <span>{t.landing.freeTrial}</span>
            </div>
            <div className="flex items-center space-x-2 text-primary-foreground/90">
              <CheckCircle className="w-5 h-5" />
              <span>{t.landing.cancelAnytime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              {t.landing.aboutTitle}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t.landing.aboutSubtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">
                {t.landing.ourMission}
              </h3>
              <p className="text-muted-foreground text-lg">
                {t.landing.missionText1}
              </p>
              <p className="text-muted-foreground">{t.landing.missionText2}</p>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-accent/30 rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      50K+
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t.landing.happyUsers}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      95%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t.landing.successRate}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">5+</div>
                    <div className="text-sm text-muted-foreground">
                      {t.landing.yearsExperience}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      24/7
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t.landing.support}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">
                {t.landing.healthFirst}
              </h4>
              <p className="text-muted-foreground">
                {t.landing.healthFirstDesc}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">
                {t.landing.innovation}
              </h4>
              <p className="text-muted-foreground">
                {t.landing.innovationDesc}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">
                {t.landing.community}
              </h4>
              <p className="text-muted-foreground">{t.landing.communityDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              {t.landing.contactTitle}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t.landing.contactSubtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>{t.landing.sendMessage}</CardTitle>
                <CardDescription>{t.landing.contactFormDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {t.landing.firstName}
                      </label>
                      <input
                        type="text"
                        placeholder="John"
                        value={contactFormData.firstName}
                        onChange={(e) =>
                          handleContactInputChange("firstName", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-md bg-background transition-colors ${
                          getContactFieldError("firstName")
                            ? "border-destructive focus:border-destructive"
                            : "border-input focus:border-primary"
                        }`}
                        disabled={contactLoading}
                      />
                      <FormError message={getContactFieldError("firstName")} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {t.landing.lastName}
                      </label>
                      <input
                        type="text"
                        placeholder="Doe"
                        value={contactFormData.lastName}
                        onChange={(e) =>
                          handleContactInputChange("lastName", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-md bg-background transition-colors ${
                          getContactFieldError("lastName")
                            ? "border-destructive focus:border-destructive"
                            : "border-input focus:border-primary"
                        }`}
                        disabled={contactLoading}
                      />
                      <FormError message={getContactFieldError("lastName")} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t.landing.email}
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={contactFormData.email}
                      onChange={(e) =>
                        handleContactInputChange("email", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-md bg-background transition-colors ${
                        getContactFieldError("email")
                          ? "border-destructive focus:border-destructive"
                          : "border-input focus:border-primary"
                      }`}
                      disabled={contactLoading}
                    />
                    <FormError message={getContactFieldError("email")} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t.landing.subject}
                    </label>
                    <select
                      value={contactFormData.subject}
                      onChange={(e) =>
                        handleContactInputChange("subject", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-md bg-background transition-colors ${
                        getContactFieldError("subject")
                          ? "border-destructive focus:border-destructive"
                          : "border-input focus:border-primary"
                      }`}
                      disabled={contactLoading}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Technical Support">
                        Technical Support
                      </option>
                      <option value="Billing Question">Billing Question</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Feedback">Feedback</option>
                    </select>
                    <FormError message={getContactFieldError("subject")} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t.landing.message}
                    </label>
                    <textarea
                      placeholder={t.landing.messagePlaceholder}
                      rows={5}
                      value={contactFormData.message}
                      onChange={(e) =>
                        handleContactInputChange("message", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-md bg-background resize-none transition-colors ${
                        getContactFieldError("message")
                          ? "border-destructive focus:border-destructive"
                          : "border-input focus:border-primary"
                      }`}
                      disabled={contactLoading}
                    />
                    <div className="flex justify-between items-center">
                      <FormError message={getContactFieldError("message")} />
                      <span className="text-xs text-muted-foreground">
                        {contactFormData.message.length}/1000
                      </span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={contactLoading}
                  >
                    {contactLoading ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        {t.landing.sendMessageBtn}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  {t.landing.contactInfo}
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {t.landing.email}
                      </h4>
                      <p className="text-muted-foreground">
                        support@yousefrecharge.com
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t.landing.emailDesc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Phone</h4>
                      <p className="text-muted-foreground">+965 1234 5678</p>
                      <p className="text-sm text-muted-foreground">
                        {t.landing.phoneDesc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Office</h4>
                      <p className="text-muted-foreground">
                        Kuwait City, Kuwait
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t.landing.officeDesc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {t.landing.faq}
                </h3>
                <div className="space-y-4">
                  <details className="group border rounded-lg">
                    <summary className="flex items-center justify-between p-4 cursor-pointer">
                      <span className="font-medium">
                        How do I cancel my subscription?
                      </span>
                      <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="px-4 pb-4 text-sm text-muted-foreground">
                      You can cancel your subscription at any time from your
                      account settings or by contacting our support team.
                    </div>
                  </details>

                  <details className="group border rounded-lg">
                    <summary className="flex items-center justify-between p-4 cursor-pointer">
                      <span className="font-medium">
                        Do you offer personal training?
                      </span>
                      <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="px-4 pb-4 text-sm text-muted-foreground">
                      Yes! Our premium plans include access to certified
                      personal trainers for one-on-one guidance.
                    </div>
                  </details>

                  <details className="group border rounded-lg">
                    <summary className="flex items-center justify-between p-4 cursor-pointer">
                      <span className="font-medium">
                        Is there a mobile app?
                      </span>
                      <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="px-4 pb-4 text-sm text-muted-foreground">
                      Our web app is fully mobile-responsive. Native iOS and
                      Android apps are coming soon!
                    </div>
                  </details>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {t.landing.followUs}
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <span className="text-primary font-bold">f</span>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <span className="text-primary font-bold">@</span>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <span className="text-primary font-bold">in</span>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <span className="text-primary font-bold">yt</span>
                  </a>
                </div>
              </div>
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
                  Yousef Recharge
                </span>
              </div>
              <p className="text-muted-foreground">
                {t.landing.footerDescription}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">
                {t.landing.product}
              </h4>
              <div className="space-y-2">
                <Link
                  to="/#features"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.nav.features}
                </Link>
                <Link
                  to="/plans"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.landing.plans}
                </Link>
                <Link
                  to="/subscription"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.landing.pricing}
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">
                {t.landing.company}
              </h4>
              <div className="space-y-2">
                <a
                  href="#about"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.nav.about}
                </a>
                <a
                  href="#contact"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.nav.contact}
                </a>
                <a
                  href="#careers"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.landing.careers}
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">
                {t.landing.legal}
              </h4>
              <div className="space-y-2">
                <a
                  href="#privacy"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.landing.privacyPolicy}
                </a>
                <a
                  href="#terms"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.landing.termsOfService}
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
            <p className="text-muted-foreground">{t.landing.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
