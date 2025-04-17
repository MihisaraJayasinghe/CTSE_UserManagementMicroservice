# Use official Node image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the backend port
EXPOSE 4000

# Run the server
CMD ["node", "server.js"]
