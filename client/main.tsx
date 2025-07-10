import "./global.css";
import React from "react";
import { createRoot } from "react-dom/client";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
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

      <div style={{ marginBottom: "30px" }}>
        <h2>💳 Subscription Plans</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "20px",
              borderRadius: "8px",
              border: "2px solid #2563eb",
              position: "relative",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
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
            <h3
              style={{
                margin: "0 0 10px 0",
                color: "#1f2937",
                fontSize: "20px",
              }}
            >
              Monthly Plan
            </h3>
            <div
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#2563eb",
                marginBottom: "5px",
              }}
            >
              15 KWD
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "#6b7280",
                marginBottom: "15px",
              }}
            >
              per month
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "#4b5563",
                marginBottom: "15px",
              }}
            >
              Full access to all features
            </p>
            <ul
              style={{
                fontSize: "14px",
                color: "#6b7280",
                paddingLeft: "0",
                listStyle: "none",
                marginBottom: "20px",
              }}
            >
              <li
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
                Unlimited workouts
              </li>
              <li
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
                Meal planning
              </li>
              <li
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
                  ���
                </span>
                Progress tracking
              </li>
            </ul>
            <button
              style={{
                width: "100%",
                backgroundColor: "#2563eb",
                color: "white",
                padding: "12px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Choose Monthly Plan
            </button>
          </div>
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
        </div>
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
          ✅ Working Fitness Platform
        </h3>
        <p style={{ color: "#0369a1" }}>
          The platform is now loading without React errors!
        </p>
      </div>
    </div>
  );
}

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<App />);
}
