# Use the official Node.js 16 image
FROM node:16 as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install NestJS dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install TypeScript globally
RUN npm install -g typescript

# Build the NestJS application
RUN npm run build

# Use a smaller Node.js image for the production build
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the built application from the build image
COPY --from=build /app/dist ./dist
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Expose port 3000 for the NestJS application
EXPOSE 3000

# Command to run the application in production
CMD ["node", "dist/main"]