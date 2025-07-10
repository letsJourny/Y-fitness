# 🏋️‍♂️ Yousef Recharge Fitness Platform - Complete Setup Guide

A comprehensive fitness platform with workout tracking, meal planning, progress analytics, and subscription management.

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Prerequisites](#-prerequisites)
- [Local Development Setup](#-local-development-setup)
- [Project Structure](#-project-structure)
- [Environment Configuration](#-environment-configuration)
- [Database Setup](#-database-setup)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Testing](#-testing)
- [Production Deployment](#-production-deployment)
- [Troubleshooting](#-troubleshooting)

## 🎯 Project Overview

The Yousef Recharge platform includes:

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Payments**: Stripe integration
- **SMS**: Twilio integration
- **Authentication**: JWT-based auth with OTP verification

### Features

✅ **User Management**: Registration, OTP verification, profiles  
✅ **Workout System**: Exercise library, workout templates, logging  
✅ **Nutrition Tracking**: Meal templates, nutrition goals, analytics  
✅ **Progress Tracking**: Body metrics, photos, achievements  
✅ **Subscription Management**: Plans, payments, billing  
✅ **50+ API Endpoints**: Complete RESTful API

## 🔧 Prerequisites

Before setting up the project, ensure you have:

- **Node.js** v18+ and npm v8+
- **PostgreSQL** v13+ (local or cloud)
- **Git** for version control
- **Code Editor** (VS Code recommended)

## 🚀 Local Development Setup

### 1. Clone & Install

```bash
# Clone the repository
git clone <your-repo-url>
cd yousef-recharge

# Install dependencies
npm install

# Generate Prisma client
npm run db:generate
```

### 2. Environment Setup

Copy the environment template:

```bash
cp .env.example .env
```

Update `.env` with your local configuration:

```env
# Database (Local PostgreSQL)
DATABASE_URL="postgresql://username:password@localhost:5432/yousef_recharge"

# Authentication
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Development settings
NODE_ENV="development"
PORT=3000
CLIENT_URL="http://localhost:5173"

# Optional integrations (add when needed)
STRIPE_SECRET_KEY="sk_test_..."
TWILIO_ACCOUNT_SID="AC..."
TWILIO_AUTH_TOKEN="..."
```

### 3. Database Setup

```bash
# Start PostgreSQL service (depends on your setup)
brew services start postgresql  # macOS
sudo systemctl start postgresql # Linux
# Windows: Start PostgreSQL from Services

# Create database
createdb yousef_recharge

# Push schema to database
npm run db:deploy

# (Optional) Seed initial data
npx prisma db seed
```

### 4. Development Server

```bash
# Start frontend and backend concurrently
npm run dev

# Or run separately:
# Frontend (port 5173)
npm run dev:client

# Backend (port 3000)
npm run dev:server
```

## 📁 Project Structure

```
yousef-recharge/
├── client/                 # Frontend React application
│   ├── main.tsx           # Main app entry point
│   ├── global.css         # Global styles
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utility libraries
├── server/                 # Backend Express server
│   ├── index.ts           # Main server file
│   ├── routes/            # API route handlers
│   │   ├── auth.ts        # Authentication routes
│   │   ├── workouts.ts    # Workout management
│   │   ├── meals.ts       # Nutrition tracking
│   │   ├── progress.ts    # Progress analytics
│   │   └── subscriptions.ts # Payment handling
│   ├── middleware/        # Custom middleware
│   └── services/          # Business logic services
├── prisma/                # Database schema and migrations
│   └── schema.prisma      # Database schema definition
├── shared/                # Shared types and utilities
├── public/                # Static assets
├── scripts/               # Build and deployment scripts
├── deploy.sh              # Automated deployment script
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Frontend build configuration
```

## 🔐 Environment Configuration

### Development (.env)

```env
# Core Configuration
NODE_ENV="development"
PORT=3000
CLIENT_URL="http://localhost:5173"

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/yousef_recharge"

# Authentication
JWT_SECRET="your-development-jwt-secret"

# Integrations (optional for development)
STRIPE_SECRET_KEY="sk_test_your_stripe_test_key"
TWILIO_ACCOUNT_SID="AC_your_twilio_sid"
TWILIO_AUTH_TOKEN="your_twilio_token"
TWILIO_PHONE_NUMBER="+1234567890"
```

### Production (.env.production)

```env
# Core Configuration
NODE_ENV="production"
PORT=8080
CLIENT_URL="https://your-frontend-domain.com"

# Database (from your cloud provider)
DATABASE_URL="postgresql://user:pass@host:port/db"

# Authentication (generate secure key)
JWT_SECRET="your-super-secure-production-jwt-secret"

# Payment Processing
STRIPE_SECRET_KEY="sk_live_your_live_stripe_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

# SMS Service
TWILIO_ACCOUNT_SID="AC_your_production_sid"
TWILIO_AUTH_TOKEN="your_production_token"
TWILIO_PHONE_NUMBER="+your_verified_number"
```

## 🗄️ Database Setup

### Local PostgreSQL Setup

#### macOS (Homebrew)

```bash
# Install PostgreSQL
brew install postgresql

# Start service
brew services start postgresql

# Create user and database
createuser yousef_admin
createdb yousef_recharge -O yousef_admin
```

#### Ubuntu/Debian

```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create user and database
sudo -u postgres createuser yousef_admin
sudo -u postgres createdb yousef_recharge -O yousef_admin
```

#### Windows

1. Download PostgreSQL from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Install with default settings
3. Use pgAdmin to create database `yousef_recharge`

### Database Migration

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Or use migrations (for production)
npx prisma migrate deploy

# View database in browser
npx prisma studio
```

## 🏃 Running the Application

### Development Mode

```bash
# Install dependencies
npm install

# Start both frontend and backend
npm run dev

# Access the application
# Frontend: http://localhost:5173
# Backend API: http://localhost:3000/api
# Database Studio: npx prisma studio
```

### Production Mode

```bash
# Build the application
npm run build

# Start production server
npm start

# Access at configured PORT (default 8080)
```

### Available Scripts

```bash
npm run dev            # Start development servers
npm run build          # Build for production
npm start              # Start production server
npm run db:generate    # Generate Prisma client
npm run db:deploy      # Deploy database schema
npm test               # Run tests
npm run format.fix     # Format code with Prettier
```

## 🔌 API Endpoints

### Authentication & Users

```http
POST   /api/auth/register           # User registration
POST   /api/auth/send-otp          # Send OTP verification
GET    /api/users/:userId          # Get user profile
POST   /api/contact                # Contact form submission
```

### Exercises & Workouts

```http
# Exercise Management
POST   /api/exercises              # Create exercise
GET    /api/exercises              # List exercises
GET    /api/exercises/:id          # Get exercise details
PUT    /api/exercises/:id          # Update exercise
DELETE /api/exercises/:id          # Delete exercise

# Workout Templates
POST   /api/workout-templates      # Create template
GET    /api/workout-templates      # List templates
GET    /api/workout-templates/:id  # Get template details

# Workout Logging
POST   /api/users/:userId/workouts # Log workout
GET    /api/users/:userId/workouts # Get user workouts
PUT    /api/workouts/:id           # Update workout
DELETE /api/workouts/:id           # Delete workout
```

### Meals & Nutrition

```http
# Meal Templates
POST   /api/meal-templates         # Create meal template
GET    /api/meal-templates         # List meal templates
GET    /api/meal-templates/:id     # Get template details
PUT    /api/meal-templates/:id     # Update template
DELETE /api/meal-templates/:id     # Delete template

# Meal Logging
POST   /api/users/:userId/meals    # Log meal
GET    /api/users/:userId/meals    # Get user meals
PUT    /api/meals/:id              # Update meal
DELETE /api/meals/:id              # Delete meal

# Nutrition Analytics
GET    /api/users/:userId/nutrition/daily   # Daily nutrition
GET    /api/users/:userId/nutrition/weekly  # Weekly nutrition
POST   /api/users/:userId/nutrition-goals   # Set nutrition goals
GET    /api/users/:userId/nutrition-goals   # Get nutrition goals
```

### Progress & Analytics

```http
# Body Metrics
POST   /api/users/:userId/body-metrics      # Log body metrics
GET    /api/users/:userId/body-metrics      # Get body metrics
PUT    /api/body-metrics/:id                # Update metrics
DELETE /api/body-metrics/:id                # Delete metrics

# Progress Analytics
GET    /api/users/:userId/progress/analytics # Get progress analytics

# Achievements
POST   /api/achievements                     # Create achievement
GET    /api/users/:userId/achievements       # Get user achievements
POST   /api/users/:userId/achievements/:id/unlock # Unlock achievement

# Goals
POST   /api/users/:userId/goals              # Create goal
GET    /api/users/:userId/goals              # Get user goals
PUT    /api/goals/:id                        # Update goal
DELETE /api/goals/:id                        # Delete goal
```

### Subscriptions & Payments

```http
# Subscription Plans
POST   /api/subscription-plans               # Create plan (admin)
GET    /api/subscription-plans               # List plans
GET    /api/subscription-plans/:id           # Get plan details
PUT    /api/subscription-plans/:id           # Update plan (admin)

# User Subscriptions
POST   /api/users/:userId/subscription       # Create subscription
GET    /api/users/:userId/subscription       # Get user subscription
PUT    /api/subscriptions/:id                # Update subscription
DELETE /api/subscriptions/:id                # Cancel subscription

# Payment Methods
GET    /api/users/:userId/payment-methods    # Get payment methods
POST   /api/users/:userId/payment-methods    # Add payment method
DELETE /api/payment-methods/:id              # Remove payment method

# Webhooks
POST   /api/webhooks/stripe                  # Stripe webhook handler
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### API Testing

Use tools like Postman, Insomnia, or curl:

```bash
# Test API health
curl http://localhost:3000/api/ping

# Test registration
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","fullName":"Test User","password":"password123","age":25,"weight":70,"gender":"male","goal":"lose_weight"}'

# Test subscription plans
curl http://localhost:3000/api/subscription-plans
```

## 🚀 Production Deployment

### Quick Deploy with Script

```bash
# Make deploy script executable
chmod +x deploy.sh

# Run interactive deployment
./deploy.sh
```

### Manual Deployment

#### Railway (Recommended)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and create project
railway login
railway new yousef-recharge

# Add PostgreSQL
railway add postgresql

# Set environment variables
railway variables set NODE_ENV=production
railway variables set JWT_SECRET="$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")"

# Deploy
git add .
git commit -m "Deploy to Railway"
railway up
```

#### Render

1. Go to [render.com](https://render.com)
2. Create new PostgreSQL database
3. Create new Web Service
4. Connect GitHub repository
5. Set build command: `npm install && npm run build`
6. Set start command: `npm start`
7. Add environment variables

#### Environment Variables for Production

```env
NODE_ENV=production
PORT=8080
DATABASE_URL=<from-your-database-provider>
JWT_SECRET=<generate-secure-secret>
STRIPE_SECRET_KEY=<your-live-stripe-key>
TWILIO_ACCOUNT_SID=<your-twilio-sid>
TWILIO_AUTH_TOKEN=<your-twilio-token>
CLIENT_URL=<your-frontend-url>
```

### Post-Deployment

1. Update frontend `API_BASE_URL` to your deployed backend
2. Configure Stripe webhooks to point to your deployed API
3. Test all endpoints to ensure proper functionality
4. Set up monitoring and logging

## 🔧 Troubleshooting

### Common Issues

#### Database Connection Issues

```bash
# Error: P1001: Can't reach database server
# Solution: Check DATABASE_URL and ensure PostgreSQL is running

# Verify connection
npx prisma db pull
```

#### Build Failures

```bash
# Error: Cannot find module '@prisma/client'
# Solution: Generate Prisma client
npm run db:generate

# Error: TypeScript compilation errors
# Solution: Check types and run type check
npm run typecheck
```

#### Port Conflicts

```bash
# Error: EADDRINUSE
# Solution: Change port or kill existing process
lsof -ti:3000 | xargs kill -9  # Kill process on port 3000
```

#### API Connection Issues

```javascript
// Frontend shows API errors
// Solution: Check API_BASE_URL in client/main.tsx
const API_BASE_URL = import.meta.env.PROD
  ? "https://your-api-url.com/api" // Update this
  : "http://localhost:3000/api";
```

### Debugging Commands

```bash
# View database content
npx prisma studio

# Check API health
curl http://localhost:3000/api/ping

# View server logs
npm run dev:server

# Reset database (development only)
npx prisma db push --force-reset
```

### Development Tips

1. **Database Changes**: Always run `npx prisma generate` after schema changes
2. **Environment**: Never commit `.env` files to version control
3. **API Testing**: Use Postman or similar tools for endpoint testing
4. **Error Logs**: Check browser console and server logs for errors
5. **Hot Reload**: Both frontend and backend support hot reload in development

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [React Documentation](https://react.dev)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Twilio SMS API](https://www.twilio.com/docs/sms)

## 🎉 Success!

You now have a fully functional fitness platform with:

- ✅ 50+ API endpoints
- ✅ Complete database schema
- ✅ Frontend application
- ✅ Payment integration
- ✅ SMS notifications
- ✅ Progress tracking
- ✅ Subscription management

**Start building amazing fitness experiences!** 💪

---

For issues or questions, check the troubleshooting section or review the API documentation.
