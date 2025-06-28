import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Navigation from "@/components/Navigation";
import {
  ArrowRight,
  Mail,
  Globe,
  Dumbbell,
  Target,
  Scale,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Registration() {
  const [language, setLanguage] = useState("en");
  const [authMethod, setAuthMethod] = useState("email");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    age: "",
    weight: "",
    gender: "",
    goal: "",
    phone: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration form submitted:", formData);
    // Handle registration logic here
  };

  const text = {
    en: {
      title: "Start Your Fitness Journey",
      subtitle: "Create your account and get personalized fitness plans",
      fullName: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      age: "Age",
      weight: "Weight (kg)",
      gender: "Gender",
      male: "Male",
      female: "Female",
      other: "Other",
      goal: "Fitness Goal",
      loseWeight: "Lose Weight",
      gainMuscle: "Gain Muscle",
      maintain: "Maintain Weight",
      register: "Create Account",
      signIn: "Sign In",
      existingAccount: "Already have an account?",
      emailAuth: "Continue with Email",
      otpAuth: "Continue with Phone (OTP)",
      sendOtp: "Send OTP",
      enterOtp: "Enter OTP sent to your phone",
      language: "Language",
    },
    ar: {
      title: "ابدأ رحلتك في اللياقة البدنية",
      subtitle: "أنشئ حسابك واحصل على خطط لياقة بدنية مخصصة",
      fullName: "الاسم الكامل",
      email: "عنوان البريد الإلكتروني",
      phone: "رقم الهاتف",
      age: "العمر",
      weight: "الوزن (كيلو)",
      gender: "الجنس",
      male: "ذكر",
      female: "أنثى",
      other: "آخر",
      goal: "هدف اللياقة البدنية",
      loseWeight: "فقدان الوزن",
      gainMuscle: "بناء العضلات",
      maintain: "الحفاظ على الوزن",
      register: "إنشاء حساب",
      signIn: "تسجيل الدخول",
      existingAccount: "هل لديك حساب بالفعل؟",
      emailAuth: "متابعة بالبريد الإلكتروني",
      otpAuth: "متابعة بالهاتف (OTP)",
      sendOtp: "إرسال OTP",
      enterOtp: "أدخل OTP المرسل لهاتفك",
      language: "اللغة",
    },
  };

  const currentText = text[language as keyof typeof text];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Language Toggle */}
          <div className="flex justify-center">
            <div className="flex items-center space-x-2 bg-card rounded-lg p-1 border">
              <Button
                variant={language === "en" ? "default" : "ghost"}
                size="sm"
                onClick={() => setLanguage("en")}
                className="text-xs"
              >
                <Globe className="w-3 h-3 mr-1" />
                English
              </Button>
              <Button
                variant={language === "ar" ? "default" : "ghost"}
                size="sm"
                onClick={() => setLanguage("ar")}
                className="text-xs"
              >
                <Globe className="w-3 h-3 mr-1" />
                العربية
              </Button>
            </div>
          </div>

          <Card
            className="border-0 shadow-2xl"
            style={{ direction: language === "ar" ? "rtl" : "ltr" }}
          >
            <CardHeader className="text-center space-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <Dumbbell className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">
                {currentText.title}
              </CardTitle>
              <CardDescription className="text-base">
                {currentText.subtitle}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <Tabs
                value={authMethod}
                onValueChange={setAuthMethod}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email" className="text-xs">
                    <Mail className="w-4 h-4 mr-2" />
                    {currentText.emailAuth}
                  </TabsTrigger>
                  <TabsTrigger value="otp" className="text-xs">
                    {currentText.otpAuth}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="email" className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-sm font-medium">
                        <User className="w-4 h-4 inline mr-2" />
                        {currentText.fullName}
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder={currentText.fullName}
                        value={formData.fullName}
                        onChange={(e) =>
                          handleInputChange("fullName", e.target.value)
                        }
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        <Mail className="w-4 h-4 inline mr-2" />
                        {currentText.email}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={currentText.email}
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        required
                      />
                    </div>

                    {/* Age and Weight */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="age" className="text-sm font-medium">
                          {currentText.age}
                        </Label>
                        <Input
                          id="age"
                          type="number"
                          placeholder="25"
                          value={formData.age}
                          onChange={(e) =>
                            handleInputChange("age", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weight" className="text-sm font-medium">
                          <Scale className="w-4 h-4 inline mr-1" />
                          {currentText.weight}
                        </Label>
                        <Input
                          id="weight"
                          type="number"
                          placeholder="70"
                          value={formData.weight}
                          onChange={(e) =>
                            handleInputChange("weight", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>

                    {/* Gender */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">
                        {currentText.gender}
                      </Label>
                      <RadioGroup
                        value={formData.gender}
                        onValueChange={(value) =>
                          handleInputChange("gender", value)
                        }
                        className="flex space-x-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male" className="text-sm">
                            {currentText.male}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female" className="text-sm">
                            {currentText.female}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other" className="text-sm">
                            {currentText.other}
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Fitness Goal */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        <Target className="w-4 h-4 inline mr-2" />
                        {currentText.goal}
                      </Label>
                      <Select
                        value={formData.goal}
                        onValueChange={(value) =>
                          handleInputChange("goal", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={currentText.goal} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lose-weight">
                            {currentText.loseWeight}
                          </SelectItem>
                          <SelectItem value="gain-muscle">
                            {currentText.gainMuscle}
                          </SelectItem>
                          <SelectItem value="maintain">
                            {currentText.maintain}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      {currentText.register}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="otp" className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Phone Number */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        {currentText.phone}
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+965 XXXX XXXX"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        required
                      />
                    </div>

                    <Button type="button" className="w-full" size="lg">
                      {currentText.sendOtp}
                    </Button>

                    {/* OTP Input (show after sending OTP) */}
                    <div className="space-y-2">
                      <Label htmlFor="otp" className="text-sm font-medium">
                        OTP
                      </Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="123456"
                        maxLength={6}
                      />
                      <p className="text-xs text-muted-foreground">
                        {currentText.enterOtp}
                      </p>
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      {currentText.register}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {currentText.existingAccount}{" "}
                  <Link
                    to="/dashboard"
                    className="text-primary hover:underline font-medium"
                  >
                    {currentText.signIn}
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-xs text-muted-foreground">
            <p>
              By creating an account, you agree to our{" "}
              <a href="#terms" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
