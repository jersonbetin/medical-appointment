import { ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import type { NextApiRequest, NextApiResponse } from 'next';

import { typeDefs } from './schemas';
import { resolvers } from './resolvers';
import { GraphQLError } from 'graphql';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: (context) => context,
  formatError: (error: GraphQLError) => {
    console.error(error);

    return error;
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function name(req: NextApiRequest, res: NextApiResponse) {
  await startServer;
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}
