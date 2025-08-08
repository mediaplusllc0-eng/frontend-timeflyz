#!/bin/bash

APP_DIR="/home/ubuntu/frontend-uat/build"
cd $APP_DIR

echo "Installing dependencies..."
npm install

echo "Starting app..."
pm2 restart time-flyz-customer-uat
