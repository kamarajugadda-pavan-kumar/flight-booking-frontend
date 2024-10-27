# Stage 1: Build the React app with Vite
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the app
ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL
RUN npm run build

# Stage 2: Serve the built files with NGINX
FROM nginx:latest

# Copy build files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom NGINX configuration from the root of the repo
RUN rm /etc/nginx/conf.d/*
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
