#!/bin/bash

if [ "$APP_ENV" = "development" ]; then
  FLASK_ENV=development flask run --host=0.0.0.0
else
  uwsgi --http 0.0.0.0:5000 --module app:app --enable-threads
fi
