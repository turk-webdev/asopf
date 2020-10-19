# The commands in the Dockerfile are run sequential and cached. They will not rebuild
# automatically unless the configuration is changed.

# specify the node base image with your desired version node:<version>
# 12.18.4 LTS is the long-term support version
FROM node:12.18.4

# Specify our working directory for this container
WORKDIR /application

# Copy dependencies list from our application to container
COPY ./package.json /application/package.json
# Copy the locked versions of dependencies so that dependencies are consistent
COPY ./package-lock.json /application/package-lock.json

# Install dependancies specified in the package.json
RUN npm install

# Copy code from our repo directory to the container
COPY . .

# Make port 8080 available outside of container
# EXPOSE 8080

# Run our node commands
# Theses commands run the application with nodemon & livereload enabled
CMD ["node", "app.js"]