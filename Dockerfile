FROM node:14-alpine

WORKDIR /code/ad-connector

COPY ./ /code/ad-connector

RUN npm install \
  && npm run build

CMD npm run start
