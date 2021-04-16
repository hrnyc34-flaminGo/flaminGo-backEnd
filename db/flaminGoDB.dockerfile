FROM mongo:4.4.1

COPY /sampleData/dump /dump
COPY /sampleData/initdb.sh /docker-entrypoint-initdb.d/initdb.sh
ENV MONGO_INITDB_DATABASE=flaminGo
WORKDIR /
