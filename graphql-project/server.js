import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import { resolvers } from './resolvers.js';
import { readFile } from 'node:fs/promises';

const PORT = 1488;

const application = express();

application.use(cors(), express.json());

const typeDefs = await readFile('./schema.graphql', 'utf8');

const apollo = new ApolloServer({ typeDefs, resolvers });
await apollo.start();
application.use('/graphql', apolloMiddleware(apollo));

application.listen({ port: PORT }, () => {
    console.log(`Server is successfully running on ${PORT}`);
    console.log(`GraphQL endpoint is successfully running on http://localhost:${PORT}/graphql`);
});
