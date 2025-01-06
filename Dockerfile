# Stage 1: Build Stage
FROM node:23-alpine3.19 AS build

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the code
RUN npm run build

# Stage 2: Production Stage
FROM node:23-alpine3.19

# Set working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Expose the port Vite will serve on (default is 5173, change if needed)
EXPOSE 9191

# Start the app
CMD ["npm", "run", "preview"]