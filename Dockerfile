# Node.js build stage
FROM node:alpine3.19 AS nodework
WORKDIR /aignosis
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# NGINX production stage
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
# Ensure the correct path to the build directory
COPY --from=nodework /aignosis/dist . 
ENTRYPOINT ["nginx", "-g", "daemon off;"]
