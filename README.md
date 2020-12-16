# ASOPF

This was a group project for my Software Engineering course. 
The objective was to create a web application that would show data for COVID stats and wildfire statuses in California.

## How to Build Locally

We used Docker to synchronize everyone's development environments and databases.
To build and run this project locally, make sure you are cd'd into the `application` folder.
Then use the following commands
`docker-compose -f docker-compose.dev.yml build --no-cache` : builds the Docker container, does not cache anything
`docker-compose -f docker-compose.dev.yml up` : runs the project within the Docker container
Use ctrl+C at any point to stop the Docker program running
Make sure to also use the following command to kill any lingering processes
`docker-compose -f docker-compose.dev.yml down --no-orphans`

## My Contributions

* Layout & functionality for all of the COVID data view & search tables
* Layout & functionality of the user's dashboard
* Working search bar in nav menu
* Creating dynamic view adjustment for COVID data + map view
* Managing team in the role of team lead to ensure all groups (front & back end teams) coordinated & working well
