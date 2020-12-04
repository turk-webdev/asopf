FROM nginx:mainline

EXPOSE 80

# Delete the default welcome to nginx page
# RUN rm /usr/share/nginx/html/*

# Copy over the custom default config
COPY configs/nginx.conf /etc/nginx/conf.d/nginx.conf

# Start nginx in the foreground to play nicely with docker
CMD ["nginx", "-g", "daemon off;"]

