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
  Mail,
  Phone,
  MapPin,
  ChevronDown,
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
              Why Choose Yousef Recharge?
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
              Yousef Recharge.
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
              className="text-lg px-8 py-6 border-primary-foreground/20 hover:bg-primary-foreground/10 hover:text-primary"
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

      {/* About Section */}
      <section id="about" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              About Yousef Recharge
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Empowering your fitness journey with science-backed methods and
              personalized guidance for lasting transformation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">
                Our Mission
              </h3>
              <p className="text-muted-foreground text-lg">
                At Yousef Recharge, we believe fitness should be accessible,
                sustainable, and tailored to your unique lifestyle. Our platform
                combines cutting-edge technology with proven fitness science to
                deliver personalized workout and nutrition plans that actually
                work.
              </p>
              <p className="text-muted-foreground">
                Founded by fitness enthusiasts and backed by certified
                nutritionists and personal trainers, we've helped over 50,000
                people achieve their health and fitness goals. Whether you're
                just starting your journey or looking to break through a
                plateau, we're here to support you every step of the way.
              </p>
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
                      Happy Users
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
                      Success Rate
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">5+</div>
                    <div className="text-sm text-muted-foreground">
                      Years Experience
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      24/7
                    </div>
                    <div className="text-sm text-muted-foreground">Support</div>
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
                Health First
              </h4>
              <p className="text-muted-foreground">
                Your health and well-being are our top priority. Every plan is
                designed with safety and sustainability in mind.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">
                Innovation
              </h4>
              <p className="text-muted-foreground">
                We leverage the latest fitness technology and research to
                provide you with the most effective training methods.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">
                Community
              </h4>
              <p className="text-muted-foreground">
                Join a supportive community of like-minded individuals on their
                own fitness journeys.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Get in Touch
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24
                  hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <select className="w-full px-3 py-2 border rounded-md bg-background">
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Billing Question</option>
                    <option>Partnership</option>
                    <option>Feedback</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea
                    placeholder="Tell us how we can help you..."
                    rows={5}
                    className="w-full px-3 py-2 border rounded-md bg-background resize-none"
                  />
                </div>

                <Button className="w-full" size="lg">
                  Send Message
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Email</h4>
                      <p className="text-muted-foreground">
                        support@yousefrecharge.com
                      </p>
                      <p className="text-sm text-muted-foreground">
                        We typically respond within 24 hours
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
                        Mon-Fri 9:00 AM - 6:00 PM (Kuwait Time)
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
                        Headquarters & Support Center
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Frequently Asked Questions
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
                  Follow Us
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
              © 2024 Yousef Recharge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
