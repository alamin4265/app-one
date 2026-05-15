#!/bin/sh
set -e

# Inject runtime values into config.json at container start.
# APP_ENV, APP_VERSION, APP_COLOR come from K8s ConfigMap (via envFrom).
# HOSTNAME is set automatically by K8s to the pod name.
# BUILD_TIME is baked into the image at docker build time.
cat > /usr/share/nginx/html/assets/config.json <<EOF
{
  "environment": "${APP_ENV}",
  "version": "${APP_VERSION}",
  "color": "${APP_COLOR}",
  "podName": "${HOSTNAME}",
  "buildTime": "${BUILD_TIME}"
}
EOF

exec nginx -g "daemon off;"
