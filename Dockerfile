# Base image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
RUN npm install

# Copy project files
COPY . .

# Load environment variables
ARG VITE_APP_ENV
ARG VITE_READ_ONLY_USER_PASSWORD
ENV VITE_APP_ENV=$VITE_APP_ENV
ENV VITE_READ_ONLY_USER_PASSWORD=$VITE_READ_ONLY_USER_PASSWORD

# Build the app
RUN npm run build

# Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
