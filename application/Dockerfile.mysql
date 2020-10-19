FROM mysql:8.0.21

COPY ./database/mysql-entrypoint.sh /docker-entrypoint-initdb.d 

RUN chmod +x ./docker-entrypoint-initdb.d/mysql-entrypoint.sh