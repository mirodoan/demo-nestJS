#!/bin/sh

echo "� Testing database migration with detailed logging..."
echo "📍 Environment check:"
echo "DATABASE_URL: ${DATABASE_URL}"
echo "NODE_ENV: ${NODE_ENV}"

echo "🧪 Testing database connection..."
npm run migration:run

if [ $? -eq 0 ]; then
  echo "✅ Migration completed successfully!"
  echo "🚀 Starting the application..."
  node dist/main.js
else
  echo "❌ Migration failed! But starting app anyway for debugging..."
  echo "🔍 Migration logs above should show the exact error"
  echo "🚀 Starting the application..."
  node dist/main.js
fi
