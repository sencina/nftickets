#!/bin/sh

# Run database migrations
echo "Running database migrations..."
npm run db:migrate

# Start the application
echo "Starting the application..."
tsx ./src/index.ts 