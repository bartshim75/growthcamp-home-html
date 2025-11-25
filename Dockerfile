FROM nginx:alpine

# Copy static files to nginx html directory
COPY . /usr/share/nginx/html/

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 (required for Cloud Run)
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
