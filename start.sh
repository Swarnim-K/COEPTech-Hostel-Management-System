#!/bin/bash

if [ "$1" == "server" ]; then
    # Start MongoDB
    mongod &

    # Wait for MongoDB to start
    echo "Waiting for MongoDB to start..."
    while ! curl -sSf http://localhost:27017 >/dev/null; do
        sleep 1
    done

    echo "MongoDB has started successfully."

    # Install dependencies and start the server
    cd server
    npm install
    nodemon .
elif [ "$1" == "client" ]; then
    # Install dependencies and start the client
    cd client
    npm install
    npm run dev
else
    echo "Invalid argument. Usage: ./start.sh [server|client]"
    exit 1
fi
