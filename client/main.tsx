import "./global.css";
import React from "react";
import { createRoot } from "react-dom/client";

// API Configuration
const API_BASE_URL = import.meta.env.PROD
  ? "https://your-api-url.onrender.com/api" // Update this with your actual deployed API URL
  : "http://localhost:3000/api";

// Simple API client
const api = {
  async get(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    return response.json();
  },

  async post(endpoint: string, data: any) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
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
        alert("Message sent successfully!");
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
        >
          Get Started
        </button>
      </div>

      {/* Subscription Plans from Real API */}
      {subscriptionPlans.length > 0 && (
        <div style={{ marginBottom: "30px" }}>
          <h2>💳 Live Subscription Plans</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "15px",
            }}
          >
            {subscriptionPlans.map((plan, index) => (
              <div
                key={plan.id || index}
                style={{
                  backgroundColor: "#f3f4f6",
                  padding: "15px",
                  borderRadius: "5px",
                  border: plan.isPopular
                    ? "2px solid #2563eb"
                    : "1px solid #d1d5db",
                }}
              >
                <h3 style={{ margin: "0 0 10px 0", color: "#1f2937" }}>
                  {plan.name} {plan.isPopular && "⭐"}
                </h3>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#2563eb",
                  }}
                >
                  {plan.price} {plan.currency}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    marginBottom: "10px",
                  }}
                >
                  per {plan.interval}
                </div>
                <p style={{ fontSize: "14px", color: "#4b5563" }}>
                  {plan.description}
                </p>
                {plan.features && (
                  <ul
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      paddingLeft: "20px",
                    }}
                  >
                    {plan.features
                      .slice(0, 3)
                      .map((feature: string, i: number) => (
                        <li key={i}>{feature}</li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginBottom: "30px" }}>
        <h2>💪 Workout Plans</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#f3f4f6",
              padding: "15px",
              borderRadius: "5px",
            }}
          >
            <h3>Beginner Full Body</h3>
            <p>30 min • 4 exercises • 150 cal</p>
          </div>
          <div
            style={{
              backgroundColor: "#f3f4f6",
              padding: "15px",
              borderRadius: "5px",
            }}
          >
            <h3>HIIT Cardio</h3>
            <p>20 min • 3 exercises • 200 cal</p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h2>🥗 Meal Plans</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#f3f4f6",
              padding: "15px",
              borderRadius: "5px",
            }}
          >
            <h3>Protein Smoothie</h3>
            <p>320 cal • 25g protein • 5 min prep</p>
          </div>
          <div
            style={{
              backgroundColor: "#f3f4f6",
              padding: "15px",
              borderRadius: "5px",
            }}
          >
            <h3>Quinoa Bowl</h3>
            <p>450 cal • 18g protein • 25 min prep</p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h2>📊 Progress</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "15px",
          }}
        >
          <div
            style={{
              backgroundColor: "#dbeafe",
              padding: "15px",
              borderRadius: "5px",
              textAlign: "center",
            }}
          >
            <div
              style={{ fontSize: "24px", fontWeight: "bold", color: "#2563eb" }}
            >
              450
            </div>
            <div style={{ fontSize: "12px" }}>Calories Burned</div>
          </div>
          <div
            style={{
              backgroundColor: "#dcfce7",
              padding: "15px",
              borderRadius: "5px",
              textAlign: "center",
            }}
          >
            <div
              style={{ fontSize: "24px", fontWeight: "bold", color: "#16a34a" }}
            >
              1,240
            </div>
            <div style={{ fontSize: "12px" }}>Calories Consumed</div>
          </div>
          <div
            style={{
              backgroundColor: "#fed7aa",
              padding: "15px",
              borderRadius: "5px",
              textAlign: "center",
            }}
          >
            <div
              style={{ fontSize: "24px", fontWeight: "bold", color: "#ea580c" }}
            >
              3/4
            </div>
            <div style={{ fontSize: "12px" }}>Weekly Workouts</div>
          </div>
          <div
            style={{
              backgroundColor: "#e9d5ff",
              padding: "15px",
              borderRadius: "5px",
              textAlign: "center",
            }}
          >
            <div
              style={{ fontSize: "24px", fontWeight: "bold", color: "#9333ea" }}
            >
              5
            </div>
            <div style={{ fontSize: "12px" }}>Achievements</div>
          </div>
        </div>
      </div>

      {/* Working Contact Form */}
      <div
        style={{
          backgroundColor: "#f3f4f6",
          padding: "20px",
          borderRadius: "5px",
        }}
      >
        <h2>📝 Contact Us (Live API Test)</h2>
        <form onSubmit={handleContactSubmit} style={{ maxWidth: "400px" }}>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <textarea
              name="message"
              placeholder="Your message..."
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                minHeight: "80px",
                resize: "vertical",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#2563eb",
              color: "white",
              padding: "12px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Send Message (Test API)
          </button>
        </form>
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          backgroundColor: "#f0f9ff",
          borderRadius: "5px",
        }}
      >
        <h3>🚀 Deployment Ready!</h3>
        <p>This app is ready to connect to a live backend API. To deploy:</p>
        <ol>
          <li>
            Run <code>./deploy.sh</code> to deploy the backend
          </li>
          <li>
            Update <code>API_BASE_URL</code> in this file with your live API URL
          </li>
          <li>Deploy this frontend to Vercel, Netlify, or similar</li>
        </ol>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
