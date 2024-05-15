# POSTGRES EXPRESS REACT REDUX BOILERPLATE

Welcome to another fullstack web-application boiler-plate by Nicholas Anna. This package aims to give you everything you need to create a full-stack web-application.

## System Prereqs

You must have docker desktop and the node.js and npm versions specified in main package.json. A `.nvmrc` file is provided to handle this automatically if NVM (node version manager) is installed globally and properly configured

## Getting Started
### Download Dependencies

In a terminal, run once to download js deps:

    npm install --save-dev --legacy-peer-deps

### Run
In a terminal, run:

    npm run database-start

In a another terminal, at the same time, run:

    npm run migrate
    npm run server-watch

In another terminal, at the same time, run:

    npm run frontend-start


### Alternate Run
A docker container for each of the above services is contained in the `dockerfiles` folder. A complete dev enviroment with all services can be spun up using:

    docker-compose -f compose.dev.yaml build
    docker-compose -f compose.dev.yaml up -d
