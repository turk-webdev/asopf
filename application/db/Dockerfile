FROM mysql:8

COPY ./mysql-entrypoint.sh /docker-entrypoint-initdb.d 

RUN chmod +x ./docker-entrypoint-initdb.d/mysql-entrypoint.sh