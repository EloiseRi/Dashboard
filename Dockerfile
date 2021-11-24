FROM node:alpine

# Create app directory & move in
WORKDIR /app

# Installing dependencies
COPY package*.json ./
RUN npm install

RUN mkdir /app/.next && chmod -R 777 /app/.next

# Copying source files
COPY . /app

# Building the app
RUN npm run build
EXPOSE 3000

# Running the app
ENTRYPOINT [ "npm", "run" ]