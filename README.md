# Auth Workflow

An example app to show an approach to authentication with JWTs, Node/Express and React. The app uses a simple check to see if signature matches the one from our authetication server. In a real app, you'd want to use AuthO to issue and handle your tokens.

## Project start up

Set up environment variables in the root of the api folder:

```bash
PORT=
DB_NAME=
SECRET_KEY=
TOKEN_EXPIRY=
```

Start up Mongo with docker

```bash
docker run -p 27017:27017 mongo
```

Start up the server (makse sure Node version is >=14 because of ESmodules)

```bash
> cd api
> npm run start
```

Start up the React client

```bash
> cd client
> npm run start
```
