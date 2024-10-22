import { GraphQLError } from 'graphql';
import { getCompany } from './db/companies.js';
import { getJob, getJobs } from './db/jobs.js';

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