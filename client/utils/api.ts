// API configuration and utilities

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  details?: any[];
}

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: any[],
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.message || "Request failed",
        response.status,
        data.details,
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    // Network or parsing error
    throw new ApiError(
      "Network error. Please check your connection and try again.",
      0,
    );
  }
}

// API functions
export const api = {
  // Authentication
  register: async (userData: {
    fullName: string;
    email: string;
    age: string;
    weight: string;
    gender: string;
    goal: string;
    phone?: string;
    authMethod: string;
    otp?: string;
  }) => {
    return apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  sendOTP: async (phone: string) => {
    return apiRequest("/auth/send-otp", {
      method: "POST",
      body: JSON.stringify({ phone }),
    });
  },

  // Contact
  contact: async (contactData: {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    return apiRequest("/contact", {
      method: "POST",
      body: JSON.stringify(contactData),
    });
  },

  // User profile
  getProfile: async (userId: string) => {
    return apiRequest(`/users/${userId}`);
  },

  // Health check
  ping: async () => {
    return apiRequest("/ping");
  },
};

export { ApiError };
export type { ApiResponse };
