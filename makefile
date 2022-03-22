#!/bin/bash

# Install dependencies inside divoora-be
cd divoora-be/
yarn
nohup npm run start > /dev/null &
cd ..

# Install dependencies inside divoora-fe
cd divoora-fe/
npm install
npm start
