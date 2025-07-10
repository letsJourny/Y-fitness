import "./global.css";
import React from "react";
import { createRoot } from "react-dom/client";

// Simple static pages without any hooks
function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-blue-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Yousef Recharge</h1>
          <div className="space-x-4">
            <a href="#" className="hover:underline">
              Home
            </a>
            <a href="#plans" className="hover:underline">
              Plans
            </a>
            <a href="#progress" className="hover:underline">
              Progress
            </a>
            <a href="#registration" className="hover:underline">
              Sign Up
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Transform Your Body, Transform Your Life
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join Yousef recharge and discover your ultimate fitness potential
            with personalized workout plans, nutrition guidance, and expert
            coaching.
          </p>
          <div className="mt-8 space-x-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">
              Get Started
            </button>
            <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50">
              Learn More
            </button>
          </div>
        </div>

        <div id="plans" className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">
            Workout & Meal Plans
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-xl font-bold mb-4">💪 Workout Templates</h4>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded border">
                  <h5 className="font-semibold">Beginner Full Body</h5>
                  <p className="text-gray-600 text-sm">
                    30 min • 4 exercises • 150 cal
                  </p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h5 className="font-semibold">HIIT Cardio</h5>
                  <p className="text-gray-600 text-sm">
                    20 min • 3 exercises • 200 cal
                  </p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h5 className="font-semibold">Upper Body Strength</h5>
                  <p className="text-gray-600 text-sm">
                    45 min • 6 exercises • 180 cal
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-xl font-bold mb-4">🥗 Meal Templates</h4>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded border">
                  <h5 className="font-semibold">Protein Power Smoothie</h5>
                  <p className="text-gray-600 text-sm">
                    320 cal • 25g protein • 5 min prep
                  </p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h5 className="font-semibold">Mediterranean Quinoa Bowl</h5>
                  <p className="text-gray-600 text-sm">
                    450 cal • 18g protein • 25 min prep
                  </p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h5 className="font-semibold">Grilled Salmon & Vegetables</h5>
                  <p className="text-gray-600 text-sm">
                    380 cal • 32g protein • 30 min prep
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="progress" className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">
            Progress Tracking
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-600">450</div>
              <div className="text-sm text-gray-600">Calories Burned Today</div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600">1,240</div>
              <div className="text-sm text-gray-600">Calories Consumed</div>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-orange-600">3/4</div>
              <div className="text-sm text-gray-600">Weekly Workouts</div>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-purple-600">5</div>
              <div className="text-sm text-gray-600">Achievements</div>
            </div>
          </div>
        </div>

        <div id="registration" className="bg-gray-50 p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-center mb-6">
            Start Your Fitness Journey
          </h3>
          <div className="max-w-md mx-auto">
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="number"
                placeholder="Age"
                className="w-full p-3 border rounded-lg"
              />
              <select className="w-full p-3 border rounded-lg">
                <option>Fitness Goal</option>
                <option>Weight Loss</option>
                <option>Muscle Gain</option>
                <option>General Fitness</option>
              </select>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                Sign Up Now
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-8 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <h4 className="text-xl font-bold mb-4">Yousef Recharge</h4>
          <p className="text-gray-400">
            Transform your fitness journey with us
          </p>
        </div>
      </footer>
    </div>
  );
}

// Render the app
const root = createRoot(document.getElementById("root")!);
root.render(<HomePage />);
