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
- [Appendix](#appendix)
  * [Example Network Layout](#example-network-layout)

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
3. Verify that you are in the correct branch: `mysql-docker-connect`
    - Docker-compose is only setup for certain branches as of Milestone 2
## Configure dotenv File
3. Create `.env` file in the root of the application folder (i.e. `csc648-02-FA20-TEAM05/application/.env`)
4. Copy the template data from the `.env.example` -> `.env` and fill out the missing content
    ```bash 
    # ----------------------------------------------------------------------------------------------
    # Docker Configuration File
    # ----------------------------------------------------------------------------------------------
    # Instructions
    #   - Make a copy of this file with the name ".env" in the same directory
    #   - Fill out the missing variable information
    #   - Run "docker-compose -f docker-compose.dev.yml config" to verify that changes in this file
    #     will show up in the docker-compose.dev.yml at startup
    #   - DO NOT DELETE ".env.example" it is used as reference for the rest of the team members

    # Name service name of the database in the docker-compose file
    MYSQL_HOSTNAME=

    # MySQL standard port can be used here since it is on the docker internal network not your localhost network
    # To access the database from your local machine edit the docker-compose to "expose" the port you want
    MYSQL_PORT=3306

    # Name of the database you want to access
    MYSQL_DATABASE=

    # Username and password for that database
    MYSQL_USERNAME=
    MYSQL_PASSWORD=

    # Root password used during initialization script so that mysql empty root password error doesn't occur
    MYSQL_ROOT_PASSWORD=

    # Port you will use in mysql workbench to connect to database
    # If MySQL is already running on your local machine then you must choose a PORT # other than 3306
    HOST_PORT=

    # Port we use in the browser to connect to our app. The app always runs at 8080 internally in docker. Use 8080 here if you want it to be the same as what nodemon says. (Note: Don't change the internal nodejs port in the docker-compose.dev.yml since it will break the nginx connection)
    APP_PORT=
    ```
    ***Note: Don't delete the .env.example since it is being tracked by github for others to reference***
## Building the Docker-Compose Environment
5. Verify that `docker-compose` is installed by executing `docker-compose --version` on your commandline
    ```
    C:\Users\Nick>docker-compose --version
    docker-compose version 1.27.4, build 40524192
    ```
6. To verify that your config is working correctly run
    ```
    docker-compose -f docker-compose.dev.yml config
    ```
    This will output the `docker-compose.dev.yml` file with the variables filled. If this is working correctly move on to the next step. If not, make sure that you have created the `.env` in the `application` folder.
7. Build the images so that all of the configurations are setup properly
    `docker-compose build --no-cache`
    ***Note:*** `--no-cache` is a precaution to make sure that the application image is built from the most recent dockerfile.  
## Working with the Dev Environment  
8. Start the docker containers for each service specified in the `docker-compose.dev.yml` file
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
        - `asopf not found in database`
            - Make sure that `MYSQL_DATABASE=mysql-db` is assigned properly in your `.env`
9. Start Programming
    - Now you can make changes as normal and see those changes when `nodemon` restarts the server on the container
10. Suspend the Containers

    `Ctrl+C` or `docker-compose stop`

    - If you want to pause what you are working on to come back to it later
    - Stops the containers without removing the containers and the networks that were created
    - Use the `stop` command if nodejs is running in detached mode

    `docker-compose down`

    - If you need to edit a docker file or .env file and see those changes happen in the contianer
    - Stops and removes running containers and networks
    - When the containers are started again then docker-compose will recreate the containers without rebuilding the images
    - This will not remove shared volumes and will not re-run startup scripts

    `docker-compose down -v`
    
    - If you want to remove shared volumes
    - Shared volumes will be recreated when the environment is created again using `docker-compose` 
    - This is mainly for restarting the entire docker setup from a clean slate
    - **Startup scripts like db import will be re-run on next `up` command**
11. Using Git with the Dev Environment Active
- Git works same as normal
    - Since we are sharing the `/application` folder between the local machine and app contianer
- You can use the commandline `git` commands or the git features baked into your IDE (ex. VS Code's GitHub Integration Feature)

# Appendix
## Command Glossary
`docker-compose -f docker-compose.dev.yml config`
- Output `yml` file with filled out environment variables from the `.env`
`docker-compose -f docker-compose.dev.yml build`
- Build the containers specified in the `.yml` file from their respective images
- Append `--no-cache` to ensure containers are rebuilt from scratch
`docker-compose -f docker-compose.dev.yml up`
- Start up the compose environment
- Append `--force-receate` to avoid starting from previouse container builds
`docker-compose -f docker-compose.dev.yml down`
- Stop compose environment and remove containers
- Append `-v` to remove shared volume so that startup scripts can be re-run
## Alias Setup
- Aliases are way to setup command shortcuts on your command line so you don't have to type as much
### Mac/Linux/WSL
- We can setup aliases for `docker-compose` commands by navigating to your `~/.bashrc` or equivalent and setting them
```bash
# docker compose aliases
alias dev-build='docker-compose -f docker-compose.dev.yml build'
alias dev-up='docker-compose -f docker-compose.dev.yml up'
alias dev-stop='docker-compose -f docker-compose.dev.yml stop'
alias dev-down='docker-compose -f docker-compose.dev.yml down'
alias dev-config='docker-compose -f docker-compose.dev.yml config'
alias dev-show='docker-compose -f docker-compose.dev.yml ps'  
```
- Any additional options can be set after the alias like normal: `dev-stop -v`
- You can change the alias names to whatever you want
### Windows
- Make sure that you can run scripts with powershell. If not, run powershell as administrator and `set-executionpolicy remotesigned`. This will allow you to run your own scripts in powershell.
``` c++
function dev-start() {
    docker-compose -f docker-compose.dev.yml build --no-cache; // build from scratch
    docker-compose -f docker-compose.dev.yml up; // start-up containers
}

function dev-stop() {
    docker-compose -f docker-compose.dev.yml stop; // used to stop containers while saving state
}

function dev-down() {
    docker-compose -f docker-compose.dev.yml down -v; // used to remove shared volumes and state is not saved
}

function dev-show() {
    docker-compose -f docker-compose.dev.yml ps; // show running containers
}

function dev-config() {
    docker-compose -f docker-compose.dev.yml config; // show environment configuration
}
```
- To run the commands just type the function name into the powershell terminal: `dev-show`
- You can change the function names to whatever you want, these are just examples
## Example Network Layout
- In this example you can see that the only externally accessible port is nginx port 80
- We can define any port to bind to this nginx port
    - For instance `Your Computer` can use port `3000` in place of port `8080` which can be then typed into the browser as `localhost:3000`
- When `nodemon` runs it will always output as using `8080` internally.

``` bash
# Example Network Layout For Reference
# -----------------------------------------------------------------------------------------------------------
# [Your Computer]-- 8080 -- { 80 -- [Nginx Contianer]-- 8080 --[NodeJS Container]-- 3306 --[MySQL Container] } 
# {} = {Docker Network}
# -----------------------------------------------------------------------------------------------------------
```
