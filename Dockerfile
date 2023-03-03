# Use a small base image
FROM node:14-alpine as build

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy the source code
COPY . .

# Build the app
RUN npm run build

# Remove dev dependencies
RUN npm prune --production

# Start a new image with a smaller base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the previous image
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json


# Copy the .env file into the image
COPY .env .

# Expose the port
EXPOSE 8080

# Start the app
CMD ["npm", "run", "start:prod"]