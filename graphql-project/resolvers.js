import { getJobs } from "./database/jobs.js"

const resolvers = {
    Query: {
        id: () => 'some-id',
        jobs: async () => {
            const jobs = await getJobs();
            return jobs; 
        },
    }
}

export {
    resolvers,
}
