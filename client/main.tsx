import "./global.css";
import React from "react";
import { createRoot } from "react-dom/client";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#2563eb", marginBottom: "20px" }}>
        Yousef Recharge - Fitness Platform
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

      <div
        style={{
          backgroundColor: "#f3f4f6",
          padding: "20px",
          borderRadius: "5px",
        }}
      >
        <h2>📝 Registration</h2>
        <form style={{ maxWidth: "400px" }}>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="Full Name"
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
              placeholder="Email"
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
              type="number"
              placeholder="Age"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
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
            Join Yousef Recharge
          </button>
        </form>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
