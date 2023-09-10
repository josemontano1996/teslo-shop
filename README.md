# Next.js Teslo Shop

To run locally, you will need the database.

```
docker-compose up -d
```

- -d, means **detached**

## .env configuration

Rename **.env.template** file to **.env**

- MongoDB URL Local:

```
MONGO_URL=mongodb://localhost:27017/teslodb
```

- Rebuild Node modules and start developement server

```
yarn install
yarn dev
```

## Seed the database with prepopulated data

Make a API call to:

```
http://localhost:3000/api/seed
```

