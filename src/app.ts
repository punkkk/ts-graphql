import "reflect-metadata";
import {ApolloServer} from "apollo-server";
import * as path from "path";
import {buildSchema} from "type-graphql";

import {SampleResolver, createSampleTypeSamples} from "./resolvers/sample";
import {Container} from "typedi";

async function bootstrap() {
  // build TypeGraphQL executable schema
  Container.set({
    id: "SAMPLES",
    transient: true, // create a fresh copy for each `get` of samples
    factory: () => {
      console.log("sampleRecipes copy created!");
      return createSampleTypeSamples().slice();
    },
  });

  const schema = await buildSchema({
    resolvers: [SampleResolver],
    // automatically create `schema.gql` file with schema definition in current folder
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    container: Container,
  });

  // Create GraphQL server
  const server = new ApolloServer({
    schema,
    // enable GraphQL Playground
    playground: true,
  });

  // Start the server
  const {url} = await server.listen(4000);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();
