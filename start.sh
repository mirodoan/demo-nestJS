#!/bin/sh

echo "🚀 Starting NestJS application..."
echo "⚠️ Migration completely disabled for stable deployment" 
echo "📋 Container will start successfully to allow debugging"

# Start app directly without any migration
node dist/main.js
