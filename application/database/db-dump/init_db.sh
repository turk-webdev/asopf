#!/bin/bash
echo -e "Running Database Import..."
mysql -u root -p $MYSQL_ROOT_PASSWORD $MYSQL_DATABASE < asopf_test.sql
echo -e "Done..."