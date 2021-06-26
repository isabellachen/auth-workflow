# API Set up

## Set up .env file

The React Front-End runs on port 3000, so don't set port to 3000

```bash
PORT=
DB_NAME=
SECRET_KEY=
```

## Notes

How to check your collections in mongo:

```bash
> mongo
> use auth-workflow
> show dbs
> db.createCollection("users")
```
