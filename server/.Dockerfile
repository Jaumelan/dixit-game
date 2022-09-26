FROM node 
WORKDIR /app
COPY package*.json .
RUN yarn
COPY . .
RUN yarn build
WORKDIR /app/dist
CMD [ "node", "index.js" ]
