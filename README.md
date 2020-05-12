## Environment variables

Create a file called `.env` width the following configuration

    DATABASE_URL=mysql://user:password@127.0.0.1:3306/dbName?reconnect=true
    JWT_SECRET_KEY=<Hash or key>
    
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:debug

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```