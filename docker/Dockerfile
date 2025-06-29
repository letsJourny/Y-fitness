# Multi-stage Docker build for Yousef Recharge

# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S yousef-recharge -u 1001

WORKDIR /app

# Copy built application
COPY --from=builder --chown=yousef-recharge:nodejs /app/dist ./dist
COPY --from=builder --chown=yousef-recharge:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=yousef-recharge:nodejs /app/package*.json ./
COPY --from=builder --chown=yousef-recharge:nodejs /app/prisma ./prisma

# Set environment
ENV NODE_ENV=production
ENV PORT=8080

# Expose port
EXPOSE 8080

# Switch to non-root user
USER yousef-recharge

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Start application
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/server/index.js"]
