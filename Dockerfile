# Use a node image as base
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Accept environment as build argument (e.g. VITE_APP_ENV=production)
ARG VITE_APP_ENV=production
ENV VITE_APP_ENV=$VITE_APP_ENV

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the app
COPY . .

# Vite will load .env.$VITE_APP_ENV
RUN npm run build -- --mode $VITE_APP_ENV

# Use a lightweight web server
FROM nginx:alpine AS production


# Copy build output to NGINX html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Ensure Nginx serves the correct files
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
