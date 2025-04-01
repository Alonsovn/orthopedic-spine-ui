FROM node:22-alpine as builder

# Working directory (where the application will live inside the container)
WORKDIR /app

# Adding `/app/node_modules/.bin` $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Installing all the dependencies of the application
COPY package.json ./package.json

RUN node --version
RUN npm --version
RUN npm cache clean --force
RUN rm -rf node_modules
RUN export CI=false
RUN npm install -g npm@latest
RUN npm i 

# Copy app files
COPY . ./
RUN npm run build

# production stage
FROM nginx:1.27.1-alpine as production

COPY --from=builder /app/build/ /usr/share/nginx/html

# Change ownership to Nginx user
RUN chown -R nginx:nginx /usr/share/nginx/html
RUN chown -R 755 /usr/share/nginx/html

# Copy custom Nginx configuration 
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port the app runs on 
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
