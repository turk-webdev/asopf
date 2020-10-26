#!/bin/bash
printf "Running Database Import...\n"
ls -1 *.sql | awk '{ print "source",$0 }' | mysql --batch -u $MYSQL_USERNAME -p $MYSQL_PASSWORD $MYSQL_DATABASE
printf "Done...\n"