
## Description

MediaPlatform NestJS GraphQL application. DB - PostgreSQL.

## Installation

You need to have `.env` file with environment variables that are shown below to run application:
```
#TypeORM config
TYPEORM_CONNECTION = postgres
TYPEORM_HOST = localhost
TYPEORM_PORT = 5432
TYPEORM_USERNAME = postgres
TYPEORM_PASSWORD = postgres
TYPEORM_DATABASE = mediaplatform
TYPEORM_AUTO_SCHEMA_SYNC = true
TYPEORM_ENTITIES = **/*.entity.ts
TYPEORM_MIGRATIONS = src/migration/*.ts
TYPEORM_MIGRATIONS_DIR = src/migration

JWT_SECRET = test #some secret for token
SEED_EMAIL = test #some email to seed db with admin
SEED_PASSWORD = test #some password to seed db with admin
```
Then you should install packages and run migrations:
```bash
$ npm install
$ npm run typeorm migration:run
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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
