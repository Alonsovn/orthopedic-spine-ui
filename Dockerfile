FROM node:24-alpine as builder

# Working directory (where the application will live inside the container)
WORKDIR /app

# Accept build mode as an argument (default to production)
ARG VITE_APP_ENV=production
ENV VITE_APP_ENV=$VITE_APP_ENV

# Adding `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Installing all the dependencies of the application
COPY package.json ./package.json

RUN npm cache clean --force && rm -rf node_modules
RUN export CI=false
RUN npm install -g npm@latest
RUN npm install


# Copy app files
COPY . ./

# Build the app using the passed mode
RUN npm run build -- --mode $VITE_APP_ENV

# Production stage
FROM nginx:1.27.5-alpine as production

COPY --from=builder /app/build/ /usr/share/nginx/html

# Change ownership to Nginx user
RUN chown -R nginx:nginx /usr/share/nginx/html
RUN chmod -R 755 /usr/share/nginx/html

# Copy custom Nginx configuration 
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port the app runs on 
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
