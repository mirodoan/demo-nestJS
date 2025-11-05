# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app

# Copy package files & install dependencies
COPY package*.json ./
RUN npm ci

# Copy source & build
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:18-alpine AS runner
WORKDIR /app

# Copy only built code and necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Set environment variables
ENV NODE_ENV=production

# Optional: run app as non-root user for safety
USER node

# Run the app
CMD ["node", "dist/main.js"]