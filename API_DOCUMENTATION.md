# Yousef Recharge Fitness Platform API Documentation

## Overview

Complete REST API for the Yousef Recharge fitness platform with user management, workout tracking, meal logging, progress analytics, and subscription management.

## Base URL

```
http://localhost:3000/api
```

## Authentication

Most endpoints require authentication. Include user ID in the URL path or JWT token in headers.

---

## 🔐 Authentication & Users

### Register User

```http
POST /api/auth/register
```

**Body:**

```json
{
  "fullName": "Ahmad Ali",
  "email": "ahmad@example.com",
  "age": 25,
  "weight": 75.5,
  "gender": "male",
  "goal": "lose-weight",
  "authMethod": "email",
  "phone": "+96512345678"
}
```

### Send OTP

```http
POST /api/auth/send-otp
```

**Body:**

```json
{
  "phone": "+96512345678"
}
```

### Get User Profile

```http
GET /api/users/{userId}
```

### Contact Form

```http
POST /api/contact
```

**Body:**

```json
{
  "name": "Ahmad Ali",
  "email": "ahmad@example.com",
  "message": "I need help with my subscription"
}
```

---

## 💪 Exercise & Workout Management

### Exercises

#### Create Exercise

```http
POST /api/exercises
```

**Body:**

```json
{
  "name": "Push-ups",
  "description": "Upper body strength exercise",
  "category": "strength",
  "muscleGroups": ["chest", "shoulders", "triceps"],
  "equipment": ["bodyweight"],
  "difficulty": "beginner",
  "instructions": [
    "Start in plank position",
    "Lower body to floor",
    "Push back up"
  ],
  "tips": ["Keep core engaged", "Control the movement"]
}
```

#### Get Exercises

```http
GET /api/exercises?category=strength&difficulty=beginner&limit=20&offset=0
```

#### Get Exercise by ID

```http
GET /api/exercises/{exerciseId}
```

#### Update Exercise

```http
PUT /api/exercises/{exerciseId}
```

#### Delete Exercise

```http
DELETE /api/exercises/{exerciseId}
```

### Workout Templates

#### Create Workout Template

```http
POST /api/workout-templates
```

**Body:**

```json
{
  "name": "Beginner Full Body",
  "description": "Complete beginner workout",
  "duration": 30,
  "difficulty": "beginner",
  "category": "strength",
  "exercises": [
    {
      "exerciseId": "exercise_id_here",
      "sets": 3,
      "reps": 10,
      "restTime": 60
    }
  ],
  "totalCalories": 150,
  "tags": ["full-body", "beginner"]
}
```

#### Get Workout Templates

```http
GET /api/workout-templates?category=strength&difficulty=beginner&limit=20&offset=0
```

#### Get Workout Template by ID

```http
GET /api/workout-templates/{templateId}
```

### Workout Logging

#### Log Workout

```http
POST /api/users/{userId}/workouts
```

**Body:**

```json
{
  "workoutTemplateId": "template_id_optional",
  "workoutName": "Morning Workout",
  "duration": 35,
  "exercises": [
    {
      "exerciseId": "exercise_id",
      "exerciseName": "Push-ups",
      "sets": [
        { "reps": 10, "completed": true },
        { "reps": 8, "completed": true },
        { "reps": 6, "completed": true }
      ]
    }
  ],
  "totalCalories": 180,
  "notes": "Felt strong today!",
  "rating": 4
}
```

#### Get User Workouts

```http
GET /api/users/{userId}/workouts?startDate=2024-01-01&endDate=2024-01-31&limit=20&offset=0
```

#### Update Workout

```http
PUT /api/workouts/{workoutId}
```

#### Delete Workout

```http
DELETE /api/workouts/{workoutId}
```

---

## 🥗 Meal & Nutrition Management

### Meal Templates

#### Create Meal Template

```http
POST /api/meal-templates
```

**Body:**

```json
{
  "name": "Protein Power Smoothie",
  "description": "Post-workout recovery drink",
  "category": "breakfast",
  "prepTime": 5,
  "servings": 1,
  "nutrition": {
    "calories": 320,
    "protein": 25,
    "carbs": 35,
    "fat": 8,
    "fiber": 6,
    "sugar": 28
  },
  "ingredients": [
    { "name": "Banana", "amount": 1, "unit": "medium" },
    { "name": "Protein powder", "amount": 1, "unit": "scoop" }
  ],
  "instructions": [
    "Add all ingredients to blender",
    "Blend until smooth",
    "Serve immediately"
  ],
  "tags": ["post-workout", "protein", "quick"]
}
```

#### Get Meal Templates

```http
GET /api/meal-templates?category=breakfast&maxCalories=500&limit=20&offset=0
```

#### Get Meal Template by ID

```http
GET /api/meal-templates/{templateId}
```

#### Update Meal Template

```http
PUT /api/meal-templates/{templateId}
```

#### Delete Meal Template

```http
DELETE /api/meal-templates/{templateId}
```

### Meal Logging

#### Log Meal

```http
POST /api/users/{userId}/meals
```

**Body:**

```json
{
  "mealType": "breakfast",
  "mealTemplateId": "template_id_optional",
  "mealName": "Protein Smoothie",
  "servings": 1.5,
  "nutrition": {
    "calories": 480,
    "protein": 37.5,
    "carbs": 52.5,
    "fat": 12,
    "fiber": 9,
    "sugar": 42
  },
  "notes": "Added extra banana",
  "date": "2024-01-15"
}
```

#### Get User Meals

```http
GET /api/users/{userId}/meals?startDate=2024-01-01&mealType=breakfast&limit=50&offset=0
```

#### Update Meal

```http
PUT /api/meals/{mealId}
```

#### Delete Meal

```http
DELETE /api/meals/{mealId}
```

### Nutrition Analytics

#### Get Daily Nutrition

```http
GET /api/users/{userId}/nutrition/daily?date=2024-01-15
```

#### Get Weekly Nutrition

```http
GET /api/users/{userId}/nutrition/weekly?startDate=2024-01-15
```

### Nutrition Goals

#### Set Nutrition Goals

```http
POST /api/users/{userId}/nutrition-goals
```

**Body:**

```json
{
  "dailyCalories": 2000,
  "dailyProtein": 150,
  "dailyCarbs": 250,
  "dailyFat": 65,
  "dailyFiber": 25,
  "waterGoal": 3.5
}
```

#### Get Nutrition Goals

```http
GET /api/users/{userId}/nutrition-goals
```

---

## 📊 Progress & Analytics

### Body Metrics

#### Log Body Metrics

```http
POST /api/users/{userId}/body-metrics
```

**Body:**

```json
{
  "weight": 75.2,
  "bodyFat": 18.5,
  "muscleMass": 35.8,
  "measurements": {
    "chest": 98,
    "waist": 82,
    "arms": 34,
    "thighs": 58
  },
  "photos": {
    "front": "photo_url_here",
    "side": "photo_url_here"
  },
  "notes": "Feeling stronger",
  "date": "2024-01-15"
}
```

#### Get Body Metrics

```http
GET /api/users/{userId}/body-metrics?startDate=2024-01-01&limit=50&offset=0
```

#### Update Body Metrics

```http
PUT /api/body-metrics/{metricsId}
```

#### Delete Body Metrics

```http
DELETE /api/body-metrics/{metricsId}
```

### Progress Analytics

#### Get Progress Analytics

```http
GET /api/users/{userId}/progress/analytics?period=30
```

**Response includes:**

- Workout analytics (total workouts, calories burned, avg rating)
- Nutrition analytics (avg daily macros, meal consistency)
- Body metrics trends (weight, body fat changes)
- Consistency metrics (workout days, meal logging days)

### Achievements

#### Create Achievement

```http
POST /api/achievements
```

**Body:**

```json
{
  "name": "First Workout",
  "description": "Complete your first workout",
  "icon": "🎯",
  "category": "milestone",
  "requirement": {
    "type": "count",
    "value": 1,
    "metric": "workouts"
  },
  "points": 10
}
```

#### Get User Achievements

```http
GET /api/users/{userId}/achievements
```

#### Unlock Achievement

```http
POST /api/users/{userId}/achievements/{achievementId}/unlock
```

### Goals

#### Create Goal

```http
POST /api/users/{userId}/goals
```

**Body:**

```json
{
  "type": "weight_loss",
  "title": "Lose 10kg",
  "description": "Reach target weight by summer",
  "targetValue": 10,
  "currentValue": 2.5,
  "unit": "kg",
  "targetDate": "2024-06-01",
  "priority": "high"
}
```

#### Get User Goals

```http
GET /api/users/{userId}/goals?isCompleted=false&type=weight_loss
```

#### Update Goal

```http
PUT /api/goals/{goalId}
```

#### Delete Goal

```http
DELETE /api/goals/{goalId}
```

---

## 💳 Subscription & Payment Management

### Subscription Plans

#### Create Subscription Plan

```http
POST /api/subscription-plans
```

**Body:**

```json
{
  "name": "Monthly Plan",
  "description": "Full access to all features",
  "price": 15.0,
  "currency": "KWD",
  "interval": "month",
  "features": [
    "Unlimited workouts",
    "Meal planning",
    "Progress tracking",
    "Personal trainer support"
  ],
  "isPopular": false
}
```

#### Get Subscription Plans

```http
GET /api/subscription-plans?isActive=true
```

#### Get Subscription Plan by ID

```http
GET /api/subscription-plans/{planId}
```

#### Update Subscription Plan

```http
PUT /api/subscription-plans/{planId}
```

### User Subscriptions

#### Create Subscription

```http
POST /api/users/{userId}/subscription
```

**Body:**

```json
{
  "planId": "plan_id_here",
  "paymentMethodId": "pm_stripe_payment_method_id",
  "billingAddress": {
    "line1": "123 Main St",
    "city": "Kuwait City",
    "postal_code": "12345",
    "country": "KW"
  }
}
```

#### Get User Subscription

```http
GET /api/users/{userId}/subscription
```

#### Update Subscription

```http
PUT /api/subscriptions/{subscriptionId}
```

**Body:**

```json
{
  "planId": "new_plan_id",
  "status": "paused"
}
```

#### Cancel Subscription

```http
DELETE /api/subscriptions/{subscriptionId}?immediately=false
```

### Payment Methods

#### Get Payment Methods

```http
GET /api/users/{userId}/payment-methods
```

#### Add Payment Method

```http
POST /api/users/{userId}/payment-methods
```

**Body:**

```json
{
  "paymentMethodId": "pm_stripe_payment_method_id"
}
```

#### Remove Payment Method

```http
DELETE /api/payment-methods/{paymentMethodId}
```

### Webhooks

#### Stripe Webhook

```http
POST /api/webhooks/stripe
```

_Handles Stripe payment events automatically_

---

## 📋 Response Format

### Success Response

```json
{
  "success": true,
  "data": {
    /* response data */
  },
  "pagination": {
    /* for paginated endpoints */ "total": 100,
    "limit": 20,
    "offset": 0
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    /* validation errors if applicable */
  ]
}
```

## 🔧 Environment Variables

```env
DATABASE_URL="postgresql://username:password@localhost:5432/yousef_recharge"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
TWILIO_ACCOUNT_SID="AC..."
TWILIO_AUTH_TOKEN="..."
TWILIO_PHONE_NUMBER="+1234567890"
JWT_SECRET="your-jwt-secret"
PORT=3000
NODE_ENV="development"
```

## 🚀 Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables:

   ```bash
   cp .env.example .env
   # Fill in your environment variables
   ```

3. Set up database:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000/api`

## 📊 Database Schema

The API uses PostgreSQL with Prisma ORM. Key models include:

- **User**: User profiles and authentication
- **Exercise**: Exercise library with instructions
- **WorkoutTemplate**: Pre-built workout plans
- **Workout**: User workout logs
- **MealTemplate**: Recipe library
- **Meal**: User meal logs
- **Progress**: Body metrics and measurements
- **Achievement**: Gamification system
- **Goal**: User fitness goals
- **SubscriptionPlan**: Available subscription tiers
- **Subscription**: User subscription management

## 🔒 Security Features

- Input validation with Zod schemas
- SQL injection protection via Prisma
- Rate limiting (recommended for production)
- CORS configuration
- Stripe webhook signature verification
- JWT token authentication
- Secure password hashing with bcrypt

## 📈 Performance Considerations

- Database indexing on frequently queried fields
- Pagination on list endpoints
- Efficient JSON queries for complex data
- Connection pooling with Prisma
- Caching recommendations for production

---

This API provides a complete backend for a modern fitness tracking platform with enterprise-grade features including payment processing, progress analytics, and gamification systems.
