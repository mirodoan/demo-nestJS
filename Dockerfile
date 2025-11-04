# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# Chạy migration ở đây (có đầy đủ devDependencies)
# RUN npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts

# Stage 2: Run
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY package*.json ./
COPY .env ./
CMD ["node", "dist/main.js"]