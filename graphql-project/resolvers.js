import { getJobs } from "./database/jobs.js"

const resolvers = {
    Query: {
        id: () => 'some-id',
        jobs: async () => {
            const jobs = await getJobs();
            return jobs; 
        },
    },
    Job: {
        date: (job) => {
            return job.createdAt.splice('').slice(0).join('');
        }
    }
}

export {
    resolvers,
}
