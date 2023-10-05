# Next.js Teslo Shop

## Introduction

This webpage is a full stack clothing e-commerce web application developed using Next.js for the front-end and backend, and MongoDB as a database.
If you would like to test all the standart user functionalities you can log in with the a prepopulated user using the email: 'user@user.com', and password: 123456. For security reasons admin account credentials are not given, but you can locally run the proyect and use the standart prepopulated admin account 'admin@admin.com' with a password of '123456'. At the bottom of this README you have the installation guide, which uses docker to makes things more simple, in 3 simple steps, plus configurationg your .env you can have the application running locally.

## Next.js

In this proyect we use Next.js, we have used SSG, SWR, and in SSR where needed, to improve SEO results.

## Authentication

For the authentication part the webpage uses NextAuth and users can create and log in via custom authentication or Github authentication, then we have our custom middleware that controls access to protected resources.

## Image upload

The image upload is handled via Cloudinary, from the admin panel people with privileges can update, add or delete product images, that will be stored in Cloudinary.

## Payments

Paypal payments is set as the way to handle payments.

# Users

## Admin

The admin can control which users have access to the different resources in the Users admin panel by setting privileges, by now there is just functionalities for 'admin' and 'client' privileges, but this could be expanded as needed with proper middleware.

In the admin panel, the admin has CRUD access to all products. You can update a product by clicking the link in the 'Title' section of the product dashboard, if you click the image you go to the client view of the product. The admin can also add labels to the product, so the client can search for specific products in the search bar.

They can also visualize all the orders and their current status.

### Client

The clients can buy products from the shop and have access to all his orders information.

# Local installation steps

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

Make an API call to:

```
http://localhost:3000/api/seed
```

## .env

Fill the .env file with your credentials. The proyect is ready to be run locally.

