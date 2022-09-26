FROM node AS build-stage
WORKDIR /app
COPY package*.json .
RUN yarn
COPY . .
RUN yarn build
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx
COPY --from=build-stage /app/dist/ /usr/share/nginx/html