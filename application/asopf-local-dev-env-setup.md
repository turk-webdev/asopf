# ASOPF Local Development Setup with Docker
To setup our local dev environment we are using three docker containers NodeJS, MySQL, and Nginx. We will create the NodeJS container and launch all three containers with an internally connected network using `docker-compose`. 
# Table of Contents
- [Local Development Environment Mac](#local-development-environment-mac)
  * [Prerequisites](#prerequisites)
    + [Install Git](#install-git)
    + [Setup Docker Desktop](#setup-docker-desktop)
- [Local Development Environment Windows](#local-development-environment-windows)
  * [Prerequisites](#prerequisites-1)
    + [Install Git](#install-git-1)
    + [Install Docker Desktop](#install-docker-desktop)
- [ASOPF Dev Setup](#asopf-dev-setup)
  * [Setup Local Repo](#setup-local-repo)
  * [Configure dotenv File](#configure-dotenv-file)
  * [Building the Docker-Compose Environment](#building-the-docker-compose-environment)
  * [Working with the Dev Environment](#working-with-the-dev-environment)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

# Local Development Environment Mac
## Prerequisites
### Install Git 
***Note:*** If you have XCode then you should already have git
- [Git for Mac](https://git-scm.com/download/mac)

### Setup Docker Desktop
- [Docker Desktop](https://docs.docker.com/docker-for-mac/install/)
- Start Docker Desktop
- [Sign up for Docker](https://hub.docker.com/) if you don't have an account
    - ***Why?*** We need a Docker account to pull the `Nginx` and `DockerHub` images from [DockerHub](https://hub.docker.com/)
    - One way to think of DockerHub is like GitHub but for Docker containers instead of code
- Jump to [ASOPF Dev Setup](#asopf-dev-setup)

<div style="page-break-after: always;"></div>

# Local Development Environment Windows
## Prerequisites
### Install Git 
- [Git for Windows](https://gitforwindows.org/)
- [Git with VS Code](https://code.visualstudio.com/docs/editor/github)
- Other Command Lines Compatible with Git
    - Git Bash (Can be Installed with Git For Windows)
    - Command Prompt
    - [cmder](https://cmder.net/)
### Install Docker Desktop
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
    - If you uncheck WSL2 checkbox then you can skip ***Start Docker Desktop***
- Install [Kernel update for WSL2](https://docs.microsoft.com/en-us/windows/wsl/wsl2-kernel) & Restart Docker Desktop
- Follow this guide to setup the [VS Code and the Windows Subsystem for Linux](https://code.visualstudio.com/docs/remote/wsl-tutorial)
    - Nodemon doesn't work if you clone your repo to your windows machine
    - Clone the repo into a directory within your linux subsystem (PM if you have trouble)
- Start Docker Desktop
- [Sign up for Docker](https://hub.docker.com/) if you don't have an account
    - ***Why?*** We need a Docker account to pull the `Nginx` and `DockerHub` images from [DockerHub](https://hub.docker.com/)
    - One way to think of DockerHub is like GitHub but for Docker containers instead of code

<div style="page-break-after: always;"></div>

# ASOPF Dev Setup
## Setup Local Repo
1. Clone Repository to local machine
    - (*Windows Users Only*) If you are using WSL2 clone the repo into a directory within your linux subsystem (PM if you have trouble)
2. Navigate to the directory you just cloned
## Configure dotenv File
3. Create `.env` file in the root of the application folder (i.e. `csc648-02-FA20-TEAM05/application/.env`)
4. Copy the template data from the `.env.example` -> `.env` and fill out the missing content
    ```bash 
    # [Your Computer]-- 8080 -- { 80 -- [Nginx Contianer]-- 8080 --[NodeJS Container]-- 3306 --[MySQL Container] } 
    # {} = {Docker Network}

    # Name service name of the database in the docker-compose file
    MYSQL_HOSTNAME=

    # MySQL standard port can be used here since it is on the docker internal network not your localhost network
    # To access the database from your local machine edit the docker-compose to "expose" the port you want
    MYSQL_PORT=

    # Name of the database the MYSQL image will create on startup and that our .sql (our data) is imported 
    MYSQL_DATABASE=

    # Username and password for the database created 
    MYSQL_USERNAME=
    MYSQL_PASSWORD=

    # Root password used during initialization script 
    MYSQL_ROOT_PASSWORD=

    # Port you will use in mysql workbench to connect to database
    HOST_PORT=
    ```
## Building the Docker-Compose Environment
5. Verify that `docker-compose` is installed by executing `docker-compose --version` on your commandline
    ```
    C:\Users\Nick>docker-compose --version
    docker-compose version 1.27.4, build 40524192
    ```
6. Build the images so that all of the configurations are setup properly
    `docker-compose build --no-cache`
    ***Note:*** `--no-cache` is a precaution to make sure that the application image is built from the most recent dockerfile.  
## Working with the Dev Environment  
7. Start the docker containers for each service specified in the `docker-compose.dev.yml` file
    ```
    docker-compose -f docker-compose.dev.yml up
    ```
    - `-f` Tells docker which docker-compose file to use since we have multiple

    ***Ex. Output***
    ```bash
    cole@NickWin10:~/code/csc648-02-fa20-team05/application$ docker-compose -f docker-compose.dev.yml up
    Creating volume "application_mysql" with default driver
    Creating mysql-db  ... done
    Creating asopf-app ... done
    Creating nginx     ... done
    ...
    [ A bunch of other startup logs ]
    ...
    asopf-app    | [nodemon] 1.19.4
    asopf-app    | [nodemon] to restart at any time, enter `rs`
    asopf-app    | [nodemon] watching dir(s): *.*
    asopf-app    | [nodemon] watching extensions: js,mjs,json
    asopf-app    | [nodemon] starting `node app.js`
    asopf-app    | Server started on port 8080
    nginx        | 172.20.0.1 - - [12/Oct/2020:20:44:50 +0000] "GET / HTTP/1.1" 200 6288 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:81.0) Gecko/20100101 Firefox/81.0" "-"
    ```
    - ***Possible Issues***
        - `Unauthorized: incorrect username or password`
            - Sign into Docker by right clicking on the icon in your windows tray
        - `Port Not Available / Bind Address Already in Use`
            - Change `HOST_PORT` in your .env file to one that is available and listening on your computer
            - Running `netstat -a -n` in your command line shows all of the available ports on your computer
        - `/usr/bin/env: 'bash\r': No such file or directory`
            - Errors caused by developing on Mac and Windows (Line endings are interpreted differently)
                - Run `git config core.autocrlf`in your commandline and if true run `git config --global core.autocrlf input`
            - Save your `.env` file outside of repo and then delete your cloned repository 
            - Clone repository again and copy your `.env` file back into the `application` folder
8. Start Programming
    - Now you can make changes as normal and see those changes when `nodemon` restarts the server on the container
9. Shutting Down the Containers

    `docker-compose stop`

    - If you want to pause what you are working on to come back to it later
    - Stops the containers without removing the containers and the networks that were created

    `docker-compose down`

    - If you need to edit a docker file or .env file and see those changes happen in the contianer
    - Stops and removes running containers and networks
    - When the containers are started again then docker-compose will recreate the containers without rebuilding the images

    `docker-compose down -v`
    
    - If you want to remove shared volumes
    - Shared volumes will be recreated when the environment is created again using `docker-compose` 
10. Using Git with the Dev Environment Active
- Git works same as normal
    - Since we are sharing the `/application` folder between the local machine and app contianer
- You can use the commandline `git` commands or the git features baked into your IDE (ex. VS Code's GitHub Integration Feature)

