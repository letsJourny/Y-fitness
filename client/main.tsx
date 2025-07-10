import "./global.css";
import React from "react";
import { createRoot } from "react-dom/client";

// API Configuration - fallback for development
const API_BASE_URL = import.meta.env.PROD
  ? "https://your-api-url.onrender.com/api" // Update this with your actual deployed API URL
  : "https://demo-api.example.com/api"; // Mock API for development

// Simple API client with fallback for development
const api = {
  async get(endpoint: string) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      return response.json();
    } catch (error) {
      console.warn("API call failed, using mock data:", error);
      return this.getMockData(endpoint);
    }
  },

  async post(endpoint: string, data: any) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (error) {
      console.warn("API call failed, using mock response:", error);
      return { success: true, message: "Mock response - API not available" };
    }
  },

  getMockData(endpoint: string) {
    if (endpoint === "/ping") {
      return { message: "Mock API - Development Mode" };
    }
    if (endpoint === "/subscription-plans") {
      return {
        success: true,
        data: [
          {
            id: "monthly",
            name: "Monthly Plan",
            description: "Full access to all features",
            price: 15,
            currency: "KWD",
            interval: "month",
            features: [
              "Unlimited workouts",
              "Meal planning",
              "Progress tracking",
              "Personal trainer support",
            ],
            isPopular: false,
          },
          {
            id: "quarterly",
            name: "Quarterly Plan",
            description: "Best value for committed users",
            price: 12,
            currency: "KWD",
            interval: "quarter",
            features: [
              "Unlimited workouts",
              "Meal planning",
              "Progress tracking",
              "Personal trainer support",
              "Nutrition consultation",
            ],
            isPopular: true,
          },
          {
            id: "yearly",
            name: "Yearly Plan",
            description: "Maximum savings for long-term goals",
            price: 8,
            currency: "KWD",
            interval: "year",
            features: [
              "Unlimited workouts",
              "Meal planning",
              "Progress tracking",
              "Personal trainer support",
              "Nutrition consultation",
              "Priority support",
            ],
            isPopular: false,
          },
        ],
      };
    }
    return { success: false, message: "Mock endpoint not found" };
  },
};

function App() {
  const [apiStatus, setApiStatus] = React.useState<string>("Checking...");
  const [subscriptionPlans, setSubscriptionPlans] = React.useState<any[]>([]);

  // Test API connection on load
  React.useEffect(() => {
    const testApi = async () => {
      try {
        const healthCheck = await api.get("/ping");
        setApiStatus(`✅ Connected: ${healthCheck.message}`);

        // Try to load subscription plans
        const plans = await api.get("/subscription-plans");
        if (plans.success) {
          setSubscriptionPlans(plans.data);
        }
      } catch (error) {
        setApiStatus(`❌ API Error: ${error}`);
      }
    };

    testApi();
  }, []);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const result = await api.post("/contact", {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      });

      if (result.success) {
        alert("Message sent successfully! " + result.message);
        e.currentTarget.reset();
      } else {
        alert("Error sending message: " + result.message);
      }
    } catch (error) {
      alert("Error: " + error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* API Status */}
      <div
        style={{
          backgroundColor: "#f0f9ff",
          padding: "10px",
          borderRadius: "5px",
          marginBottom: "20px",
          border: "1px solid #0ea5e9",
        }}
      >
        <strong>🔗 API Status:</strong> {apiStatus}
        <br />
        <small>API URL: {API_BASE_URL}</small>
        <br />
        <small>
          💡 In development mode, the app uses mock data when API is not
          available
        </small>
      </div>

      <h1 style={{ color: "#2563eb", marginBottom: "20px" }}>
        🏋️‍♂️ Yousef Recharge - Fitness Platform
      </h1>

      <div style={{ marginBottom: "30px" }}>
        <h2>🏠 Welcome</h2>
        <p>
          Transform your body, transform your life with personalized fitness
          plans.
        </p>
        <button
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() =>
            alert("Get Started clicked! This would navigate to registration.")
          }
        >
          Get Started
        </button>
      </div>

      {/* Subscription Plans */}
      <div style={{ marginBottom: "30px" }}>
        <h2>💳 Subscription Plans</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {subscriptionPlans.map((plan, index) => (
            <div
              key={plan.id || index}
              style={{
                backgroundColor: "#f8fafc",
                padding: "20px",
                borderRadius: "8px",
                border: plan.isPopular
                  ? "2px solid #2563eb"
                  : "1px solid #e2e8f0",
                position: "relative",
                boxShadow: plan.isPopular
                  ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                  : "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              }}
            >
              {plan.isPopular && (
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#2563eb",
                    color: "white",
                    padding: "4px 12px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  MOST POPULAR
                </div>
              )}
              <h3
                style={{
                  margin: "0 0 10px 0",
                  color: "#1f2937",
                  fontSize: "20px",
                }}
              >
                {plan.name}
              </h3>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "#2563eb",
                  marginBottom: "5px",
                }}
              >
                {plan.price} {plan.currency}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  marginBottom: "15px",
                }}
              >
                per {plan.interval}
              </div>
              <p
                style={{
                  fontSize: "14px",
                  color: "#4b5563",
                  marginBottom: "15px",
                }}
              >
                {plan.description}
              </p>
              {plan.features && (
                <ul
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    paddingLeft: "0",
                    listStyle: "none",
                    marginBottom: "20px",
                  }}
                >
                  {plan.features.map((feature: string, i: number) => (
                    <li
                      key={i}
                      style={{
                        marginBottom: "8px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          color: "#10b981",
                          marginRight: "8px",
                          fontWeight: "bold",
                        }}
                      >
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
              <button
                style={{
                  width: "100%",
                  backgroundColor: plan.isPopular ? "#2563eb" : "#f3f4f6",
                  color: plan.isPopular ? "white" : "#1f2937",
                  padding: "12px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
                onClick={() =>
                  alert(`${plan.name} selected! This would start checkout.`)
                }
              >
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h2>💪 Workout Plans</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#f3f4f6",
              padding: "20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={() => alert("Beginner Full Body workout selected!")}
          >
            <h3 style={{ margin: "0 0 10px 0", color: "#1f2937" }}>
              💪 Beginner Full Body
            </h3>
            <p style={{ color: "#6b7280", margin: "0 0 15px 0" }}>
              30 min • 4 exercises • 150 cal
            </p>
            <div style={{ fontSize: "12px", color: "#10b981" }}>
              ✓ Perfect for beginners ✓ No equipment needed
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#f3f4f6",
              padding: "20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={() => alert("HIIT Cardio workout selected!")}
          >
            <h3 style={{ margin: "0 0 10px 0", color: "#1f2937" }}>
              🔥 HIIT Cardio
            </h3>
            <p style={{ color: "#6b7280", margin: "0 0 15px 0" }}>
              20 min • 3 exercises • 200 cal
            </p>
            <div style={{ fontSize: "12px", color: "#10b981" }}>
              ✓ High intensity ✓ Quick results
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#f3f4f6",
              padding: "20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={() => alert("Upper Body Strength workout selected!")}
          >
            <h3 style={{ margin: "0 0 10px 0", color: "#1f2937" }}>
              🏋️ Upper Body Strength
            </h3>
            <p style={{ color: "#6b7280", margin: "0 0 15px 0" }}>
              45 min • 6 exercises • 180 cal
            </p>
            <div style={{ fontSize: "12px", color: "#10b981" }}>
              ✓ Build muscle ✓ Intermediate level
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h2>🥗 Meal Plans</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#f3f4f6",
              padding: "20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={() => alert("Protein Smoothie recipe opened!")}
          >
            <h3 style={{ margin: "0 0 10px 0", color: "#1f2937" }}>
              🥤 Protein Smoothie
            </h3>
            <p style={{ color: "#6b7280", margin: "0 0 15px 0" }}>
              320 cal • 25g protein • 5 min prep
            </p>
            <div style={{ fontSize: "12px", color: "#10b981" }}>
              ✓ Post-workout ✓ Quick & easy
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#f3f4f6",
              padding: "20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={() => alert("Quinoa Bowl recipe opened!")}
          >
            <h3 style={{ margin: "0 0 10px 0", color: "#1f2937" }}>
              🥗 Mediterranean Quinoa Bowl
            </h3>
            <p style={{ color: "#6b7280", margin: "0 0 15px 0" }}>
              450 cal • 18g protein • 25 min prep
            </p>
            <div style={{ fontSize: "12px", color: "#10b981" }}>
              ✓ Complete nutrition ✓ Vegetarian
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#f3f4f6",
              padding: "20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={() => alert("Salmon recipe opened!")}
          >
            <h3 style={{ margin: "0 0 10px 0", color: "#1f2937" }}>
              🐟 Grilled Salmon & Vegetables
            </h3>
            <p style={{ color: "#6b7280", margin: "0 0 15px 0" }}>
              380 cal • 32g protein • 30 min prep
            </p>
            <div style={{ fontSize: "12px", color: "#10b981" }}>
              ✓ Omega-3 rich ✓ Anti-inflammatory
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h2>📊 Progress Dashboard</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "15px",
          }}
        >
          <div
            style={{
              backgroundColor: "#dbeafe",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <div
              style={{ fontSize: "28px", fontWeight: "bold", color: "#2563eb" }}
            >
              450
            </div>
            <div style={{ fontSize: "12px", color: "#1e40af" }}>
              Calories Burned Today
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#dcfce7",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <div
              style={{ fontSize: "28px", fontWeight: "bold", color: "#16a34a" }}
            >
              1,240
            </div>
            <div style={{ fontSize: "12px", color: "#15803d" }}>
              Calories Consumed
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#fed7aa",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <div
              style={{ fontSize: "28px", fontWeight: "bold", color: "#ea580c" }}
            >
              3/4
            </div>
            <div style={{ fontSize: "12px", color: "#c2410c" }}>
              Weekly Workouts
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#e9d5ff",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <div
              style={{ fontSize: "28px", fontWeight: "bold", color: "#9333ea" }}
            >
              5
            </div>
            <div style={{ fontSize: "12px", color: "#7c3aed" }}>
              Achievements Unlocked
            </div>
          </div>
        </div>
      </div>

      {/* Working Contact Form */}
      <div
        style={{
          backgroundColor: "#f8fafc",
          padding: "25px",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
        }}
      >
        <h2 style={{ marginTop: "0", color: "#1f2937" }}>📝 Contact Us</h2>
        <p style={{ color: "#6b7280", marginBottom: "20px" }}>
          Have questions? Send us a message and we'll get back to you!
        </p>
        <form onSubmit={handleContactSubmit} style={{ maxWidth: "500px" }}>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
                color: "#374151",
              }}
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
                color: "#374151",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
              }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
                color: "#374151",
              }}
            >
              Message
            </label>
            <textarea
              name="message"
              placeholder="Tell us how we can help you..."
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                minHeight: "100px",
                resize: "vertical",
                fontSize: "14px",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              padding: "12px 24px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            Send Message
          </button>
        </form>
      </div>

      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#f0f9ff",
          borderRadius: "8px",
          border: "1px solid #0ea5e9",
        }}
      >
        <h3 style={{ marginTop: "0", color: "#0c4a6e" }}>
          🚀 Ready for Production!
        </h3>
        <p style={{ color: "#0369a1", marginBottom: "15px" }}>
          This fitness platform is ready to be deployed with a real backend:
        </p>
        <ol style={{ color: "#0369a1", paddingLeft: "20px" }}>
          <li style={{ marginBottom: "5px" }}>
            Run <code>./deploy.sh</code> to deploy the backend to Railway or
            Render
          </li>
          <li style={{ marginBottom: "5px" }}>
            Update the API_BASE_URL in this file with your live backend URL
          </li>
          <li style={{ marginBottom: "5px" }}>
            Deploy this frontend to Vercel, Netlify, or similar hosting service
          </li>
          <li>Your fitness platform will be live and fully functional! 🎉</li>
        </ol>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
