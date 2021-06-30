# API Set up

## Set up .env file

The React Front-End runs on port 3000, so don't set port to 3000.
Expiry for tokens can be formatted like so: `"10h", "7d"`

```bash
PORT=
DB_NAME=
SECRET_KEY=
TOKEN_EXPIRY=
```

## Notes

How to check and modify your collections in mongo:

```bash
> mongo
> use database_name
> show dbs
> db.users.find()
> db.dropDatabase()
```
