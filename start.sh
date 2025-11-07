#!/bin/sh

echo "� Starting NestJS application..."
echo "⚠️ Migration completely disabled for stable deployment"
echo "� Container will start successfully to allow debugging"

# Start app directly without any migration
node dist/main.js🔄 Running database migrations..."
npm run migration:run

if [ $? -eq 0 ]; then
  echo "✅ Migrations completed successfully!"
  echo "🚀 Starting the application..."
  node dist/main.js
else
  echo "❌ Migration failed! Starting app anyway for debugging..."
  node dist/main.js
fin/sh

echo "� Starting NestJS application..."
echo "⚠️ Migration temporarily disabled for debugging"
node dist/main.js