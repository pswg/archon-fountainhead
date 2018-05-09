FROM node:9.11.1-alpine
LABEL author="Patrick Kohler"

# Set source directory
RUN mkdir -p /app
WORKDIR /app

# Install dependencies
COPY ["package.json", "package-lock.json", "./"]
RUN npm install \
 && npm cache clean --force \
 && mv /app/node_modules /node_modules

# Copy app source
COPY app ./app

ENV PORT 3000
ENV GITHUB_API_ARCHON_URI http://github-api-proxy:8000/a
ENV GITHUB_API_USER_URI http://github-api-proxy:8000/u
EXPOSE 3000

CMD [ "npm", "start" ]