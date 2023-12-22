# Use the Node.js image with Alpine Linux as the base image
FROM node:14-alpine

# Set the working directory to the app directory
WORKDIR /api

# Copy the root-level package.json and package-lock.json from the build context
COPY ../../package.json /api
COPY ../../package-lock.json /api

# Install dependencies for API
RUN npm install

# Copy the source code for API
COPY . .

# Command to start API
CMD ["npm", "run", "start-api"]