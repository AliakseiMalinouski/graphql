import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient('http://localhost:9000/graphql');

export async function createJob ({ title, description }) {
    const mutation = gql`
        mutation ($input: CreateJobInput) {
            job: createJob(input: $input) {
                id
            }
        }
    `;
    const { job } = await client.request(mutation, {
        title,
        description,
    });
    return job;
}

export async function deleteJob (id) {
    const mutation = gql`
        mutation ($id: ID!) {
            deleteJob(id: $id) {
                job
            }
        }
    `;
    const { job } = await client.request(mutation, {
        id
    });
    return job;
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
    const { job } = await client.request(mutation, {
        id,
        title,
        description,
    });
    return job;
}
