# Use the Node.js image with Alpine Linux as the base image
FROM node:14-alpine

# Set the working directory to the app directory
WORKDIR /app

# Copy the root-level package.json and package-lock.json from the build context
COPY ../../package.json /app
COPY ../../package-lock.json /app

# Install dependencies for the frontend
RUN npm install

# Copy the source code for the frontend
COPY . .

# Command to start your frontend application
CMD ["npm", "start"]

# npx expo start --tunnel