FROM node:14

WORKDIR /code/ad-connector

COPY ./ /code/ad-connector

RUN useradd -u 8877 edify \
  && npm install \
  && npm run build

USER edify

CMD npm run start