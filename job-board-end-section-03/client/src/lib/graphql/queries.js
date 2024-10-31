import { ApolloClient, InMemoryCache, createHttpLink, gql } from "@apollo/client";

const apolloClient = new ApolloClient({
    uri: createHttpLink({ uri: 'http://localhost:9000/graphql' }),
    cache: new InMemoryCache(),
});

const getJobsFragment = gql`
    fragment GetJobs on Jobs {
        {
            id
            date
            title
            company {
            id
            name
            }
        }
    }
`;

export const getJobs = async () => {
    const query = gql`
    query {
        jobs {
            ...GetJobs,
        }
    }
    ${getJobsFragment}
    `;
    const { data } = await apolloClient.query({ 
        query,
        fetchPolicy: 'network-only',
    });
    return data.jobs;
}

export const getJob = async (id) => {
    const query = gql`
    query ($id: ID!) {
        job (id: $id) {
            id
            date
            title
            company {
                id
                name
            }
        }
    }`;
    const { data } = await apolloClient.query({
        query,
        variables: { 
            id,
        },
        fetchPolicy: 'cache-first',
    });
    return data.job;
}


export const getCompany = async (id) => {
    const query = gql`
        query ($id: ID!) {
            company(id: $id) {
                id
                name
                description
            }
        }
    `;
    const { data } = await apolloClient.query({
        query,
        variables: {
            id,
        },
        fetchPolicy: 'cache-first',
    });
    return data.company;
}
