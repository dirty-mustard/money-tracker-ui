  ### STAGE 1: Build ###

  # We label our stage as ‘builder’
  FROM node:8.1.4-alpine as builder

  RUN npm install --silent -g vue-cli

  COPY package.json package-lock.json ./

  ## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
  RUN npm i --silent && mkdir /app && cp -R ./node_modules ./app

  WORKDIR /app

  COPY . .

  EXPOSE 30800

  CMD ["npm", "run", "dev"]
