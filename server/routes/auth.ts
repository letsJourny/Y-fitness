import { RequestHandler } from "express";
import { z } from "zod";

// Validation schemas using Zod
const registrationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  age: z
    .number()
    .min(13, "Age must be at least 13")
    .max(120, "Age must be less than 120"),
  weight: z
    .number()
    .min(20, "Weight must be at least 20kg")
    .max(500, "Weight must be less than 500kg"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Gender is required",
  }),
  goal: z.enum(["lose-weight", "gain-muscle", "maintain"], {
    required_error: "Fitness goal is required",
  }),
  phone: z.string().optional(),
  authMethod: z.enum(["email", "otp"]),
  otp: z.string().optional(),
});

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

// In-memory storage for demo (replace with database in production)
const users: any[] = [];
const contacts: any[] = [];

export const handleRegistration: RequestHandler = async (req, res) => {
  try {
    // Validate request body
    const validatedData = registrationSchema.parse({
      ...req.body,
      age: parseInt(req.body.age),
      weight: parseFloat(req.body.weight),
    });

    // Check if user already exists
    const existingUser = users.find(
      (user) => user.email === validatedData.email,
    );
    if (existingUser) {
      return res.status(400).json({
        error: "User already exists",
        message: "An account with this email already exists.",
      });
    }

    // Simulate email/OTP verification
    if (validatedData.authMethod === "otp" && !validatedData.otp) {
      return res.status(400).json({
        error: "OTP required",
        message: "Please provide the OTP sent to your phone.",
      });
    }

    // Create user (in production, hash password and save to database)
    const newUser = {
      id: Date.now().toString(),
      ...validatedData,
      createdAt: new Date().toISOString(),
      isVerified: true, // In production, set based on email/OTP verification
    };

    users.push(newUser);

    // Return success response (don't include sensitive data)
    res.status(201).json({
      success: true,
      message: "Registration successful! Welcome to Yousef Recharge.",
      user: {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        goal: newUser.goal,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Validation failed",
        message: "Please check your input and try again.",
        details: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    console.error("Registration error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const handleContact: RequestHandler = async (req, res) => {
  try {
    // Validate request body
    const validatedData = contactSchema.parse(req.body);

    // Create contact entry
    const newContact = {
      id: Date.now().toString(),
      ...validatedData,
      createdAt: new Date().toISOString(),
      status: "new",
    };

    contacts.push(newContact);

    // In production, you might:
    // 1. Save to database
    // 2. Send email notification to support team
    // 3. Send confirmation email to user
    // 4. Create support ticket

    res.status(201).json({
      success: true,
      message:
        "Thank you for your message! We'll get back to you within 24 hours.",
      contactId: newContact.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Validation failed",
        message: "Please check your input and try again.",
        details: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    console.error("Contact error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const handleSendOTP: RequestHandler = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        error: "Phone number required",
        message: "Please provide a valid phone number.",
      });
    }

    // Simulate OTP generation and sending
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // In production, you would:
    // 1. Generate secure OTP
    // 2. Store in database with expiration
    // 3. Send via SMS service (Twilio, etc.)

    console.log(`OTP for ${phone}: ${otp}`); // For demo purposes

    res.json({
      success: true,
      message: "OTP sent successfully to your phone number.",
      // Don't include OTP in response in production
      otp: otp, // Only for demo
    });
  } catch (error) {
    console.error("OTP error:", error);
    res.status(500).json({
      error: "Failed to send OTP",
      message: "Please try again later.",
    });
  }
};

// Get user data (for authenticated users)
export const handleGetProfile: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = users.find((u) => u.id === userId);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
        message: "User profile not found.",
      });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        age: user.age,
        weight: user.weight,
        gender: user.gender,
        goal: user.goal,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to fetch profile.",
    });
  }
};
