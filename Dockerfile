# Stage 1: Build the React app
FROM node:24-alpine AS builder

# Set working directory
WORKDIR /app

# Accept build environment (default to production)
ARG VITE_APP_ENV=production
ENV VITE_APP_ENV=$VITE_APP_ENV

# Add node modules to path
ENV PATH /app/node_modules/.bin:$PATH

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy app source
COPY . .

# Build app with appropriate environment
RUN npm run build -- --mode $VITE_APP_ENV

# Stage 2: Serve app with Nginx
FROM nginx:1.27.5-alpine AS production

# Copy built app from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom nginx config
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Permissions
RUN chown -R nginx:nginx /usr/share/nginx/html \
 && chmod -R 755 /usr/share/nginx/html

# Expose app port
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
