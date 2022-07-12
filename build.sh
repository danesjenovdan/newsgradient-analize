#!/bin/bash

sudo docker login rg.fr-par.scw.cloud/djnd -u nologin -p $SCW_SECRET_TOKEN

sudo docker build -f ./api/Dockerfile -t newsgradient-analize:latest ./api
sudo docker tag newsgradient-analize:latest rg.fr-par.scw.cloud/djnd/newsgradient-analize:latest
sudo docker push rg.fr-par.scw.cloud/djnd/newsgradient-analize:latest