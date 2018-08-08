FROM node:8-onbuild
MAINTAINER andreacaldera@gmail.com

ENV DEBIAN_FRONTEND noninteractive
ARG CACHEBUST_MONTHLY=1
RUN apt-get update
RUN apt-get install -y curl git man less
RUN ln -sf /bin/bash /bin/sh

RUN apt-get install -y supervisor xvfb libfontconfig
RUN mkdir -p /var/log/supervisor
CMD /usr/bin/supervisord -n -c /etc/supervisor/supervisord.conf

COPY ./docker/supervisor.conf /etc/supervisor/conf.d/

WORKDIR /root/apps/app-shop
COPY ./app-shop/package.json /root/apps/app-shop/package.json
RUN npm install

WORKDIR /root/apps/app-product
COPY ./app-product/package.json /root/apps/app-product/package.json
RUN npm install

COPY . /root/apps

RUN npm run build

EXPOSE 3001 4001
