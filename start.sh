#!/bin/sh

echo "🔄 Running database migrations..."
npm run migration:run

if [ $? -eq 0 ]; then
  echo "✅ Migrations completed successfully!"
  echo "🚀 Starting the application..."
  node dist/main.js
else
  echo "❌ Migration failed!"
  exit 1
fi