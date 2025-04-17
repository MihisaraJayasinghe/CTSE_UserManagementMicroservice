# client/Dockerfile

FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the files
COPY . .

# Build production files
RUN npm run build

# Serve using 'serve'
RUN npm install -g serve

# Expose port and start the app
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]