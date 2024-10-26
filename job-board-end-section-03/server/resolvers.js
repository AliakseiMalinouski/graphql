import { GraphQLError } from 'graphql';
import { getCompany } from './db/companies.js';
import { createJob, deleteJob, getJob, getJobs, updateJob } from './db/jobs.js';

export const resolvers = {
  Query: {
    job: (_root, args) => {
      const { id } = args;
      return getJob(id);
    },
    company: (_root, args) => {
      const { id } = args;
      const company = getCompany(id);
      if(!company) {
        throw notFoundError('Not found company', 'NOT_FOUND');
      }
      return company;
    },
    jobs: () => getJobs(),
  },

  Mutation: {
    createJob: (_root, { input: { title, description } }) => {
      const companyId = 'some_id';
      const newJob = createJob({ companyId, title, description });
      return newJob;
    },
    deleteJob: (_root, { id }) => {
      return deleteJob(id);
    },
    updateJob: (_root, { input: { id, title, description } }) => {
      return updateJob({ id, title, description });
    }
  },
  
  Job: {
    company: (job) => getCompany(job.companyId),
    date: (job) => toIsoDate(job.createdAt),
  },
};

function toIsoDate(value) {
  return value.slice(0, 'yyyy-mm-dd'.length);
}

function notFoundError (message, code) {
  return new GraphQLError(message, {
    extensions: {
      code,
    } 
  });
}