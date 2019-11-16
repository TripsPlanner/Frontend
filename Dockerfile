FROM node:lts-alpine AS builder
ENV npm_config_unsafe_perm=true
WORKDIR /app
COPY package*.json /app/
RUN npm ci
COPY ./ /app/
RUN npm install
RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /app/dist/ /var/dist/

RUN mkdir -p /var/dist/
RUN cp -r /var/dist/* /var/dist/ | true
COPY ./nginx.conf /etc/nginx/
EXPOSE 80
