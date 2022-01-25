# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /usr/src/app

# add app
COPY . .
# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install app dependencies
RUN npm install --silent
RUN npm install react-scripts@5.0.0 -g --silent

# start app
CMD ["npm", "run", "start"]
