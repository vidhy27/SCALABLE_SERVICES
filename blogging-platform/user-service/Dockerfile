# Use Node.js 16 as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the application port
EXPOSE 3000

# Define the command to run the application
CMD ["node", "server.js"]

