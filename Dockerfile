# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=builder /app/dist/app-one/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

ARG BUILD_TIME=unknown
ENV BUILD_TIME=${BUILD_TIME}
ENV APP_ENV=LOCAL
ENV APP_VERSION=v1.0.0
ENV APP_COLOR=#6366f1

EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]
