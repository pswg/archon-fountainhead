FROM node:8.10.0-alpine
LABEL author="Patrick Kohler"

# Set source directory
RUN mkdir -p /app
WORKDIR /app

# Install dependencies
COPY ["package.json", "package-lock.json", "./"]
RUN npm install \
 && npm ls \
 && npm cache clean --force \
 && mv /app/node_modules /node_modules

# Copy app source
COPY /app /app

ENV PORT 80
EXPOSE 80

CMD [ "npm", "start" ]