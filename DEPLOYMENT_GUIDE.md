# 🚀 Deployment Guide - Yousef Recharge API

This guide will help you deploy the Yousef Recharge fitness platform backend to a cloud service.

## 🎯 Quick Deploy Options

### Option 1: Railway (Recommended - Easiest)

Railway offers $5/month free credit and is very beginner-friendly.

#### Step 1: Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Install Railway CLI: `npm install -g @railway/cli`

#### Step 2: Deploy Database

```bash
# Login to Railway
railway login

# Create new project
railway new

# Add PostgreSQL database
railway add postgresql
```

#### Step 3: Deploy API

```bash
# Link your project
railway link

# Set environment variables
railway variables set NODE_ENV=production
railway variables set PORT=8080
railway variables set JWT_SECRET="your-secure-jwt-secret-here"

# Deploy
git add .
git commit -m "Deploy to Railway"
git push
railway up
```

#### Step 4: Get Your API URL

```bash
railway status
```

Your API will be available at: `https://your-project.up.railway.app`

---

### Option 2: Render (Alternative)

Render offers a generous free tier.

#### Step 1: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub

#### Step 2: Create Database

1. Click "New +"
2. Select "PostgreSQL"
3. Name: `yousef-recharge-db`
4. Plan: Free
5. Create Database

#### Step 3: Deploy API

1. Click "New +"
2. Select "Web Service"
3. Connect your GitHub repository
4. Configuration:
   - **Name**: `yousef-recharge-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

#### Step 4: Environment Variables

Add these in Render dashboard:

```
NODE_ENV=production
PORT=10000
DATABASE_URL=<copy from your PostgreSQL service>
JWT_SECRET=your-secure-jwt-secret
```

---

### Option 3: Vercel (Serverless)

Good for automatic scaling but requires serverless architecture.

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Deploy

```bash
vercel --prod
```

---

## 🔧 Environment Variables Setup

### Required Variables

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# Authentication
JWT_SECRET="generate-a-secure-random-string-here"

# Stripe (Optional - for payments)
STRIPE_SECRET_KEY="sk_live_or_sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Twilio (Optional - for SMS)
TWILIO_ACCOUNT_SID="AC..."
TWILIO_AUTH_TOKEN="..."
TWILIO_PHONE_NUMBER="+1234567890"

# Server
NODE_ENV="production"
PORT=8080
```

### How to Generate JWT Secret

```bash
# Generate secure random string
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 🗄️ Database Setup

### Automatic Setup (Railway/Render)

Most cloud services will automatically set up PostgreSQL and provide `DATABASE_URL`.

### Manual Setup

If you need to set up manually:

```bash
# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# (Optional) Seed initial data
npx prisma db seed
```

---

## ✅ Verification Steps

### 1. Test API Health

```bash
curl https://your-api-url.com/api/ping
```

Should return:

```json
{ "message": "Hello from Express server v2!" }
```

### 2. Test Database Connection

```bash
curl https://your-api-url.com/api/subscription-plans
```

Should return subscription plans.

### 3. Test Full Endpoint

```bash
curl -X POST https://your-api-url.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'
```

---

## 🔄 Update Frontend

Once your backend is deployed, update your frontend to use the real API:

### Update API Base URL

In your frontend code, change from:

```javascript
const API_BASE = "http://localhost:3000/api";
```

To:

```javascript
const API_BASE = "https://your-api-url.com/api";
```

### Update CORS

In your backend `server/index.ts`, update CORS:

```javascript
app.use(
  cors({
    origin: ["https://your-frontend-domain.com", "http://localhost:5173"],
    credentials: true,
  }),
);
```

---

## 🚨 Troubleshooting

### Common Issues

#### Database Connection Error

```
Error: P1001: Can't reach database server
```

**Solution**: Check `DATABASE_URL` is correctly set

#### Build Failures

```
Error: Cannot find module '@prisma/client'
```

**Solution**: Ensure `npm run db:generate` runs in build process

#### Port Binding Issues

```
Error: listen EADDRINUSE :::3000
```

**Solution**: Use environment PORT variable: `process.env.PORT || 3000`

### Debug Commands

```bash
# Check logs (Railway)
railway logs

# Check logs (Render)
# View in Render dashboard -> Services -> Logs

# Test locally before deploying
npm run build
npm start
```

---

## 🎉 Success!

Your API is now live at:

- **Railway**: `https://your-project.up.railway.app/api`
- **Render**: `https://your-service.onrender.com/api`
- **Vercel**: `https://your-project.vercel.app/api`

### Next Steps:

1. ✅ Update frontend to use live API
2. ✅ Set up custom domain (optional)
3. ✅ Configure monitoring (optional)
4. ✅ Set up CI/CD (optional)

### API Endpoints Available:

- 🔐 **Auth**: `/api/auth/register`, `/api/auth/send-otp`
- 💪 **Workouts**: `/api/exercises`, `/api/workout-templates`
- 🥗 **Meals**: `/api/meal-templates`, `/api/users/:id/meals`
- 📊 **Progress**: `/api/users/:id/progress/analytics`
- 💳 **Subscriptions**: `/api/subscription-plans`

**Your fitness platform backend is now live and ready for users!** 🎯
