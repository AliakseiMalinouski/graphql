import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
    type Query {
        greeting: String,
    }
`;

const resolvers = {
    Query: {
        greeting: () => 'Some text',
    }
}

const server = new ApolloServer({ typeDefs, resolvers });
const info = await startStandaloneServer(server, { listen: { port: 1488 } });
console.log(`server is running at ${info.url}`);
