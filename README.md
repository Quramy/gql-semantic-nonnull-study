# GraphQL Semantic Non-null example

This repository the following examples:

- Server:
  - [Prisma ORM](https://www.prisma.io) using PostgreSQL
  - GraphQL API server via [graphql-yoga](https://the-guild.dev/graphql/yoga-server)
    - [Code genenerator for typescript-resover](https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-resolvers)
    - [DataLoader](https://github.com/graphql/dataloader)
  - And Jest test suites integrated to RDB
- Client:
  - [React Relay](https://relay.dev/)

## Setup

```sh
$ docker compose up
$ npm i
$ cp .env.example .env
```

## Start Dev Server

```sh
$ npm run migrate:dev
$ npm run seed
$ npm run dev
$ oepn http://localhost:5173 # Open Client Application
$ open http://localhost:4000/graphql # Open GraphQL Playground
```

## Run test

```sh
$ npm run migrate:test
$ npm test
```

## License

MIT
