import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new GraphQLClient('http://localhost:9000/graphql');

const apolloClient = new ApolloClient({
    uri: createHttpLink({ uri: 'http://localhost:9000/graphql' }),
    cache: new InMemoryCache(),
});

export async function createJob ({ title, description }) {
    const mutation = gql`
        mutation ($input: CreateJobInput) {
            job: createJob(input: $input) {
                id
            }
        }
    `;
    const { data } = await apolloClient.mutate(mutation, {
        title,
        description,
    });
    return data.job;
}

export async function deleteJob (id) {
    const mutation = gql`
        mutation ($id: ID!) {
            deleteJob(id: $id) {
                job
            }
        }
    `;
    const { data } = await apolloClient.mutate(mutation, {
        id
    });
    return data.job;
}

export async function updateJob ({
    id, 
    title, 
    description
}) {
    const mutation = gql`
        mutation ($input: UpdateJobInput!) {
            updateJob(input: $input) {
                job
            }
        }
    `;
    const { data } = await apolloClient.mutate(mutation, {
        id,
        title,
        description,
    });
    return data.job;
}
