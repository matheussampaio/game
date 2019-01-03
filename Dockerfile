from node:10.13.0-slim

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

RUN apt-get update && apt-get upgrade -y

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY ./ ./

RUN npx parcel build src/index.html

EXPOSE 8080

CMD ["node", "server/server.js"]
