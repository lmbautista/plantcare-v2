# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /usr/src/app

# install app dependencies
COPY package.json .
COPY package-lock.json .

RUN npm install --silent
RUN npm install react-scripts@5.0.0 -g --silent

# add app
COPY . .

# start app
CMD ["npm", "start"]
