FROM node:12.19.0

ARG MONGO_URL='mongodb://52.14.38.68:27017/flamingo'
ENV MONGO_URL='mongodb://52.14.38.68:27017/flamingo'

ADD ./elasticsearch.yml /usr/share/elasticsearch/config/

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000
CMD ["npm", "start"]