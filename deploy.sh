#!/bin/bash

echo "🚀 Yousef Recharge API Deployment Script"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if git is initialized
if [ ! -d ".git" ]; then
    print_status "Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit"
fi

echo ""
echo "Choose your deployment platform:"
echo "1) Railway (Recommended - $5/month free credit)"
echo "2) Render (Free tier available)"
echo "3) Manual setup instructions"
echo ""
read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo ""
        print_status "Setting up Railway deployment..."
        
        # Check if Railway CLI is installed
        if ! command -v railway &> /dev/null; then
            print_warning "Railway CLI not found. Installing..."
            npm install -g @railway/cli
        fi
        
        print_status "Please follow these steps:"
        echo "1. Run: railway login"
        echo "2. Run: railway new"
        echo "3. Run: railway add postgresql"
        echo "4. Run: railway variables set NODE_ENV=production"
        echo "5. Run: railway variables set JWT_SECRET=\"$(openssl rand -base64 32)\""
        echo "6. Run: railway up"
        echo ""
        print_success "Your API will be available at: https://your-project.up.railway.app/api"
        ;;
        
    2)
        echo ""
        print_status "Setting up Render deployment..."
        print_status "Please follow these steps:"
        echo "1. Go to https://render.com and sign up"
        echo "2. Create a new PostgreSQL database"
        echo "3. Create a new Web Service from this GitHub repo"
        echo "4. Set these environment variables in Render dashboard:"
        echo "   - NODE_ENV=production"
        echo "   - PORT=10000"
        echo "   - DATABASE_URL=<from your PostgreSQL service>"
        echo "   - JWT_SECRET=$(openssl rand -base64 32)"
        echo "5. Deploy!"
        echo ""
        print_success "Your API will be available at: https://your-service.onrender.com/api"
        ;;
        
    3)
        echo ""
        print_status "Manual deployment instructions:"
        echo "Please check DEPLOYMENT_GUIDE.md for detailed instructions"
        echo "Key files created:"
        echo "- railway.json (Railway config)"
        echo "- render.yaml (Render config)"
        echo "- .env.production (Environment template)"
        ;;
        
    *)
        print_error "Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
print_status "Environment variables you'll need:"
echo "=================================="
echo "DATABASE_URL - Provided by hosting service"
echo "JWT_SECRET - $(openssl rand -base64 32)"
echo "NODE_ENV - production"
echo "PORT - 8080 (Railway) or 10000 (Render)"
echo ""
echo "Optional (for full functionality):"
echo "STRIPE_SECRET_KEY - Get from Stripe dashboard"
echo "TWILIO_ACCOUNT_SID - Get from Twilio console"
echo "TWILIO_AUTH_TOKEN - Get from Twilio console"
echo ""

print_success "Deployment setup complete!"
print_status "Next steps:"
echo "1. Choose and deploy to your preferred platform"
echo "2. Set environment variables"
echo "3. Test your API endpoints"
echo "4. Update frontend to use live API URL"
echo ""
print_success "Your fitness platform will be live! 🎉"
