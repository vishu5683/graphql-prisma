import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import typeDefs from './schema.js';

import resolvers from './resolvers.js';


require('dotenv').config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

prisma.$connect() // Connect to Prisma
  .then(() => {
    console.log('Prisma is connected'); // Log when Prisma is connected
    return server.listen();
  })
  .then(({ url }) => {
    console.log(`Server ready at ${url}`);
  })
  .catch((error) => {
    console.error('Prisma connection error:', error); // Log any Prisma connection errors
  });
