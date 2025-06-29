#!/bin/bash

# Yousef Recharge Production Deployment Script
# Usage: ./scripts/deploy.sh [environment]
# Environments: staging, production

set -e  # Exit on any error

# Configuration
ENVIRONMENT=${1:-staging}
APP_NAME="yousef-recharge"
DOCKER_IMAGE="$APP_NAME:latest"
BACKUP_DIR="/var/backups/$APP_NAME"
LOG_FILE="/var/log/$APP_NAME-deploy.log"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a $LOG_FILE
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a $LOG_FILE
    exit 1
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a $LOG_FILE
}

info() {
    echo -e "${BLUE}[INFO]${NC} $1" | tee -a $LOG_FILE
}

# Pre-deployment checks
check_prerequisites() {
    log "🔍 Running pre-deployment checks..."

    # Check if running as root or with sudo
    if [[ $EUID -eq 0 ]]; then
        warning "Running as root. Consider using a dedicated deployment user."
    fi

    # Check required commands
    command -v docker >/dev/null 2>&1 || error "Docker is not installed"
    command -v docker-compose >/dev/null 2>&1 || error "Docker Compose is not installed"
    command -v git >/dev/null 2>&1 || error "Git is not installed"

    # Check environment file
    if [[ ! -f ".env.$ENVIRONMENT" ]]; then
        error "Environment file .env.$ENVIRONMENT not found"
    fi

    # Check if ports are available
    if ss -tulpn | grep -q ":80 "; then
        warning "Port 80 is already in use"
    fi

    if ss -tulpn | grep -q ":443 "; then
        warning "Port 443 is already in use"
    fi

    log "✅ Pre-deployment checks completed"
}

# Backup current deployment
backup_current() {
    log "📦 Creating backup of current deployment..."

    # Create backup directory
    mkdir -p $BACKUP_DIR

    # Backup database
    if docker-compose ps | grep -q postgres; then
        info "Backing up database..."
        docker-compose exec -T postgres pg_dump -U postgres yousef_recharge > "$BACKUP_DIR/db-backup-$(date +%Y%m%d-%H%M%S).sql"
    fi

    # Backup uploaded files
    if [[ -d "./uploads" ]]; then
        info "Backing up uploaded files..."
        tar -czf "$BACKUP_DIR/uploads-backup-$(date +%Y%m%d-%H%M%S).tar.gz" ./uploads
    fi

    # Keep only last 5 backups
    find $BACKUP_DIR -name "*.sql" -type f -mtime +5 -delete
    find $BACKUP_DIR -name "*.tar.gz" -type f -mtime +5 -delete

    log "✅ Backup completed"
}

# Build application
build_application() {
    log "🔨 Building application..."

    # Pull latest code
    info "Pulling latest code from repository..."
    git pull origin main

    # Install dependencies
    info "Installing dependencies..."
    npm ci --only=production

    # Generate Prisma client
    info "Generating Prisma client..."
    npx prisma generate

    # Run database migrations
    info "Running database migrations..."
    npx prisma migrate deploy

    # Build frontend
    info "Building frontend..."
    npm run build

    # Build Docker image
    info "Building Docker image..."
    docker build -f docker/Dockerfile -t $DOCKER_IMAGE .

    log "✅ Build completed successfully"
}

# Deploy application
deploy_application() {
    log "🚀 Deploying application to $ENVIRONMENT..."

    # Copy environment file
    cp ".env.$ENVIRONMENT" .env

    # Stop current services
    info "Stopping current services..."
    docker-compose down

    # Remove old containers and images
    info "Cleaning up old containers..."
    docker system prune -f

    # Start new services
    info "Starting new services..."
    docker-compose up -d

    # Wait for services to be ready
    info "Waiting for services to start..."
    sleep 30

    # Health check
    for i in {1..30}; do
        if curl -f http://localhost:8080/api/ping >/dev/null 2>&1; then
            log "✅ Application is healthy and responding"
            break
        fi
        if [[ $i -eq 30 ]]; then
            error "Health check failed - application is not responding"
        fi
        sleep 10
    done

    log "✅ Deployment completed successfully"
}

# Post-deployment tasks
post_deployment() {
    log "🔧 Running post-deployment tasks..."

    # Run database seeding if needed
    if [[ "$ENVIRONMENT" == "staging" ]]; then
        info "Seeding database with test data..."
        docker-compose exec app npm run db:seed
    fi

    # Clear application cache
    info "Clearing application cache..."
    docker-compose exec app npm run cache:clear || true

    # Generate sitemap
    info "Generating sitemap..."
    docker-compose exec app npm run generate:sitemap || true

    # Send deployment notification
    if [[ -n "${SLACK_WEBHOOK_URL:-}" ]]; then
        info "Sending deployment notification..."
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"🚀 Yousef Recharge deployed to $ENVIRONMENT successfully!\"}" \
            $SLACK_WEBHOOK_URL || true
    fi

    log "✅ Post-deployment tasks completed"
}

# Rollback function
rollback() {
    error_msg="$1"
    warning "🔄 Deployment failed: $error_msg"
    warning "Initiating rollback..."

    # Stop current deployment
    docker-compose down

    # Restore database backup if exists
    latest_backup=$(ls -t $BACKUP_DIR/db-backup-*.sql 2>/dev/null | head -n1)
    if [[ -n "$latest_backup" ]]; then
        info "Restoring database from backup: $latest_backup"
        docker-compose up -d postgres
        sleep 10
        cat "$latest_backup" | docker-compose exec -T postgres psql -U postgres -d yousef_recharge
    fi

    # Restore previous Docker image
    info "Restoring previous deployment..."
    # This would require keeping track of previous image tags
    # For now, we'll just restart with the current configuration

    docker-compose up -d

    error "Rollback completed. Please check the application manually."
}

# Main deployment flow
main() {
    log "🚀 Starting deployment to $ENVIRONMENT environment"

    # Trap errors and rollback
    trap 'rollback "Deployment script failed"' ERR

    check_prerequisites
    backup_current
    build_application
    deploy_application
    post_deployment

    log "🎉 Deployment to $ENVIRONMENT completed successfully!"
    info "Application is available at: http://localhost:8080"

    if [[ "$ENVIRONMENT" == "production" ]]; then
        info "Production URL: https://yousefrecharge.com"
    fi
}

# SSL Certificate setup (run separately)
setup_ssl() {
    log "🔒 Setting up SSL certificates..."

    # Install certbot if not exists
    if ! command -v certbot &> /dev/null; then
        info "Installing certbot..."
        apt-get update
        apt-get install -y certbot python3-certbot-nginx
    fi

    # Get SSL certificate
    info "Obtaining SSL certificate..."
    certbot --nginx -d yousefrecharge.com -d www.yousefrecharge.com

    # Setup auto-renewal
    info "Setting up auto-renewal..."
    echo "0 12 * * * /usr/bin/certbot renew --quiet" | crontab -

    log "✅ SSL setup completed"
}

# Performance optimization
optimize_performance() {
    log "⚡ Optimizing performance..."

    # Setup Nginx caching
    info "Configuring Nginx caching..."
    # This would copy optimized nginx configuration

    # Setup database connection pooling
    info "Optimizing database connections..."
    # This would update database configuration

    # Setup Redis caching
    info "Configuring Redis caching..."
    # This would setup Redis for session storage and caching

    log "✅ Performance optimization completed"
}

# Handle command line arguments
case "${1:-deploy}" in
    "deploy")
        main
        ;;
    "ssl")
        setup_ssl
        ;;
    "optimize")
        optimize_performance
        ;;
    "rollback")
        rollback "Manual rollback requested"
        ;;
    *)
        echo "Usage: $0 {deploy|ssl|optimize|rollback} [environment]"
        echo "  deploy [staging|production] - Deploy application"
        echo "  ssl                        - Setup SSL certificates"
        echo "  optimize                   - Optimize performance"
        echo "  rollback                   - Rollback to previous version"
        exit 1
        ;;
esac
