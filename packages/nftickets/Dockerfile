# Use Node.js 20 image
FROM node:20-slim

# Set the working directory in the container
WORKDIR /app

# Install necessary system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    && rm -rf /var/lib/apt/lists/*

# Install tsx globally
RUN npm install -g tsx

# Copy package.json and package-lock.json (if present) to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Generate Prisma client
RUN npm run db:generate

# Build the project
RUN npm run build

# Expose the port the app will run on
EXPOSE 8080

# Create a startup script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Start the app using the startup script
CMD ["/app/start.sh"]
