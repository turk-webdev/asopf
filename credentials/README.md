## Credentials for Group 5

### Logging on to the Server

#### Basic Server Information

- AWS EC2 - Running Ubuntu 18.04

  - Server IP: `3.134.206.193` or `ec2-3-134-206-193.us-east-2.compute.amazonaws.com`

- Connection Type SSH

- Authentication Type SSH Key (No Passwords or Passphrases)

  `ssh -i "[ssh pub key]" [username]@ec2-3-134-206-193.us-east-2.compute.amazonaws.com`

  or

  `ssh -i "[ssh pub key]" [username]@3.134.206.193`

- Your user has admin and sudo privileges without need for a password.

#### Database Information

- MySQL 5.7
- Logging into the DB
  - The database has specific user for the CTO that has full privileges
  - Database Username (Case-sensitive): CTO
  - Database Password: csc648-cto-g5!
- MySQL Port: 3306
- MySQL SSH Port: 22 
- Database Name: dev
- You can connect to the database in one line after logging into the server by `mysql -u CTO -p dev`
