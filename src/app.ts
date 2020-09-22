import "reflect-metadata";

import * as path from "path";

import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import * as TypeORM from "typeorm";

import { Author, Book } from "./entities";
import { BooksResolver } from "./resolvers";

// register 3rd party IOC container
TypeORM.useContainer(Container);

async function bootstrap() {
  // dont mind this piece of garbage please
  await new Promise((resolve) => setTimeout(resolve, 15000));
  try {
    // create TypeORM connection
    await TypeORM.createConnection({
      type: "mysql",
      database: "db",
      username: "user", // fill this with your username
      password: "password", // and password
      port: 3306, // and port
      host: "mysql", // and host
      entities: [Book, Author],
      synchronize: true,
      logger: "advanced-console",
      logging: "all",
      dropSchema: true,
      cache: true,
    });

    const schema = await buildSchema({
      resolvers: [BooksResolver],
      // automatically create `schema.gql` file with schema definition in current folder
      emitSchemaFile: path.resolve(__dirname, "schema.gql"),
      container: Container,
    });

    // Create GraphQL server
    const server = new ApolloServer({
      schema,
      // enable GraphQL Playground
      playground: true,
      introspection: true,
    });

    // Start the server
    const { url } = await server.listen(1337);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
  } catch (e) {
    console.error("error", e);
  }
}

bootstrap();
