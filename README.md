<p align="center">
  <span><a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  <a href="http://react.dev/" target="blank"><img src=" https:/react.dev/commons/a/a7/React-icon.svg" width="200" alt="React Logo" /></a>
 </span>
</p>

## Description

Full Stack pet project.
Food order site made on React with Typescript.
Backend: NestJs, MongoDB, Node.js

[You can try link https://foodshopnest.azurewebsites.net/](https://foodshopnest.azurewebsites.net/) app deployed on Azure portal(free account).

## Installation

In main directory maintain "app" folder this is client app source.
You have build client manualy by run build. When it will be done you may start server part.
For server you have set envirionment variebles (for development in ".env" file)
MONGO_CONECTION_STRING = mongodb+srv://<login>:<password>@cluster0.vlijgko.mongodb.net/<db_name>?retryWrites=true&w=majority
PORT=5000
if you want use another port for development change proxy settings in package.json in "app" folder

### Server

```bash
$ npm install
```

### Client

```bash
$ cd app
$ npm install
```

### Running Client

```bash
# production mode
$ cd app
$ npm run build
# development watch mode
$ cd app
$ npm start
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test server

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Buival Ievhen]
- Website - [https://nestjs.com](https://nestjs.com/)

## License

Nest is [MIT licensed](LICENSE).
