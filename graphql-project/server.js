import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql

    schema {
        query: Query
    }

    type Query {
        greeting: String,
        imageUrl: String,
    }
`;

const resolvers = {
    Query: {
        greeting: () => 'Some text',
        imageUrl: () => 'Some image url',
    },
}

const server = new ApolloServer({ typeDefs, resolvers });
const info = await startStandaloneServer(server, { listen: { port: 1488 } });
console.log(`server is running at ${info.url}`);
