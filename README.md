# Divoora Restaurant Search App

> This app let's you search restaurants and dishes. Also shows you the **nearest** restaurants available based on Haversine's nearest location. The app uses github's [OAuth](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps) to login users.

## Clone and install dependencies

```sh
git clone https://github.com/Nathan-G1/divoora-app.git
cd restaurant-app
bash makefile
```

Or you can proceed to <a href="#available-scripts">available scrips</a>

## Environment setup

Have your client `REACT_APP_CLIENT_ID` ready and put it in `.env` file int the root folder

```sh
REACT_APP_CLIENT_ID=4j902cc9xxxxxx
```

## Available Scripts

Inside each project directories, you can run the following commands:

### `npm install`

Installs necessary dependecies

### `npm start`

Starts the apps

* Runs the back-end in dev mode. [http://localhost:3001](http://localhost:3001)
* Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
