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
FROM nginx

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/dist .

WORKDIR /etc/nginx/conf.d
COPY --from=builder /app/nginx.conf  .

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]