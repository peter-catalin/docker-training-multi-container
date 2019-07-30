FROM node:alpine AS build-stage
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

# Start a new layer/phase/stage that copies the result from the previous build.
FROM nginx

# Document the fact that this particular instance of Nginx is listening on port 3000
EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build /usr/share/nginx/html