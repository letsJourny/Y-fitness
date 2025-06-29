import { RequestHandler } from "express";
import { z } from "zod";
import { DatabaseService } from "../services/database";
import {
  SMSService,
  formatPhoneNumber,
  validatePhoneNumber,
} from "../services/sms";
import bcrypt from "bcryptjs";

// Enhanced validation schemas
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
  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    required_error: "Gender is required",
  }),
  goal: z.enum(["LOSE_WEIGHT", "GAIN_MUSCLE", "MAINTAIN"], {
    required_error: "Fitness goal is required",
  }),
  phone: z.string().optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .optional(),
  authMethod: z.enum(["EMAIL", "OTP"]),
  otp: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const otpLoginSchema = z.object({
  phone: z.string().min(1, "Phone number is required"),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const resetPasswordSchema = z.object({
  token: z.string().min(1, "Reset token is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const handleRegister: RequestHandler = async (req, res) => {
  try {
    // Validate request body
    const validatedData = registrationSchema.parse({
      ...req.body,
      age: parseInt(req.body.age),
      weight: parseFloat(req.body.weight),
    });

    // Check if user already exists
    const existingUser = await DatabaseService.findUserByEmail(
      validatedData.email,
    );
    if (existingUser) {
      return res.status(400).json({
        error: "User already exists",
        message: "An account with this email already exists.",
      });
    }

    // Validate phone number if provided
    if (validatedData.phone && !validatePhoneNumber(validatedData.phone)) {
      return res.status(400).json({
        error: "Invalid phone number",
        message: "Please provide a valid phone number.",
      });
    }

    // Format phone number
    if (validatedData.phone) {
      validatedData.phone = formatPhoneNumber(validatedData.phone);
    }

    // Handle OTP verification
    if (validatedData.authMethod === "OTP") {
      if (!validatedData.phone) {
        return res.status(400).json({
          error: "Phone number required",
          message: "Phone number is required for OTP authentication.",
        });
      }

      if (!validatedData.otp) {
        return res.status(400).json({
          error: "OTP required",
          message: "Please provide the OTP sent to your phone.",
        });
      }

      // Verify OTP
      const otpValid = await DatabaseService.verifyOTP(
        validatedData.phone,
        validatedData.otp,
      );
      if (!otpValid) {
        return res.status(400).json({
          error: "Invalid OTP",
          message: "The OTP provided is invalid or has expired.",
        });
      }
    }

    // Create user
    const newUser = await DatabaseService.createUser({
      ...validatedData,
      gender: validatedData.gender as "MALE" | "FEMALE" | "OTHER",
      goal: validatedData.goal as "LOSE_WEIGHT" | "GAIN_MUSCLE" | "MAINTAIN",
      authMethod: validatedData.authMethod as "EMAIL" | "OTP",
    });

    // Verify user if using OTP (since OTP was already verified)
    if (validatedData.authMethod === "OTP") {
      await DatabaseService.verifyUser(newUser.id);
    }

    // Create session
    const { token } = await DatabaseService.createSession(newUser.id);

    // Send welcome SMS if phone is provided
    if (validatedData.phone) {
      SMSService.sendWelcomeMessage(
        validatedData.phone,
        validatedData.fullName,
      );
    }

    res.status(201).json({
      success: true,
      message: "Registration successful! Welcome to Yousef Recharge.",
      user: newUser,
      token,
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

export const handleLogin: RequestHandler = async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    // Find user by email
    const user = await DatabaseService.findUserByEmail(validatedData.email);
    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
        message: "Email or password is incorrect.",
      });
    }

    // Check password
    if (!user.password) {
      return res.status(401).json({
        error: "No password set",
        message:
          "This account uses OTP authentication. Please use phone login.",
      });
    }

    const passwordValid = await bcrypt.compare(
      validatedData.password,
      user.password,
    );
    if (!passwordValid) {
      return res.status(401).json({
        error: "Invalid credentials",
        message: "Email or password is incorrect.",
      });
    }

    // Create session
    const { token } = await DatabaseService.createSession(user.id);

    res.json({
      success: true,
      message: "Login successful!",
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        isVerified: user.isVerified,
      },
      token,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.errors,
      });
    }

    console.error("Login error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const handleOTPLogin: RequestHandler = async (req, res) => {
  try {
    const validatedData = otpLoginSchema.parse(req.body);
    const formattedPhone = formatPhoneNumber(validatedData.phone);

    // Verify OTP
    const otpValid = await DatabaseService.verifyOTP(
      formattedPhone,
      validatedData.otp,
    );
    if (!otpValid) {
      return res.status(401).json({
        error: "Invalid OTP",
        message: "The OTP provided is invalid or has expired.",
      });
    }

    // Find user by phone
    const user = await DatabaseService.findUserByEmail(validatedData.phone); // You'd need to modify this to search by phone
    if (!user) {
      return res.status(404).json({
        error: "User not found",
        message: "No account found with this phone number.",
      });
    }

    // Create session
    const { token } = await DatabaseService.createSession(user.id);

    res.json({
      success: true,
      message: "Login successful!",
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        isVerified: user.isVerified,
      },
      token,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.errors,
      });
    }

    console.error("OTP Login error:", error);
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

    const formattedPhone = formatPhoneNumber(phone);

    if (!validatePhoneNumber(formattedPhone)) {
      return res.status(400).json({
        error: "Invalid phone number",
        message: "Please provide a valid phone number.",
      });
    }

    // Generate and store OTP
    const otp = await DatabaseService.createOTP(formattedPhone);

    // Send OTP via SMS
    const smsSent = await SMSService.sendOTP(formattedPhone, otp);

    if (!smsSent) {
      return res.status(500).json({
        error: "Failed to send OTP",
        message: "Unable to send SMS. Please try again later.",
      });
    }

    res.json({
      success: true,
      message: "OTP sent successfully to your phone number.",
    });
  } catch (error) {
    console.error("OTP error:", error);
    res.status(500).json({
      error: "Failed to send OTP",
      message: "Please try again later.",
    });
  }
};

export const handleLogout: RequestHandler = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (token) {
      await DatabaseService.deleteSession(token);
    }

    res.json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      error: "Logout failed",
      message: "Something went wrong during logout.",
    });
  }
};

export const handleRefreshToken: RequestHandler = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        error: "Token required",
        message: "Please provide a valid token.",
      });
    }

    const session = await DatabaseService.validateSession(token);
    if (!session) {
      return res.status(401).json({
        error: "Invalid token",
        message: "Your session has expired. Please log in again.",
      });
    }

    // Delete old session
    await DatabaseService.deleteSession(token);

    // Create new session
    const { token: newToken } = await DatabaseService.createSession(
      session.userId,
    );

    res.json({
      success: true,
      message: "Token refreshed successfully.",
      token: newToken,
    });
  } catch (error) {
    console.error("Token refresh error:", error);
    res.status(500).json({
      error: "Token refresh failed",
      message: "Something went wrong during token refresh.",
    });
  }
};

export const handleGetProfile: RequestHandler = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Please log in to access your profile.",
      });
    }

    const user = await DatabaseService.findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
        message: "User profile not found.",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to fetch profile.",
    });
  }
};
