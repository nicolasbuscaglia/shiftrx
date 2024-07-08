#!/bin/sh

MARKER_FILE="/app/seed_marker"

if [ ! -f "$MARKER_FILE" ]; then
  echo "Seed marker not found. Running seed script..."
  
  npx prisma migrate deploy
  npm run seed
  
  touch "$MARKER_FILE"
else
  echo "Seed marker found. Skipping seed script..."
fi

exec npm start