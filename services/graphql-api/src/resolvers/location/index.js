import { locations } from './locations';
import { location } from './location';
import { formatDateTime } from '../datetime';

export const locationResolvers = {
  Query: {
    locations,
    location,
  },
  Location: {
    createdAt: async ({ createdAt }, { format }) => formatDateTime(createdAt, format),
    updatedAt: async ({ updatedAt }, { format }) => formatDateTime(updatedAt, format),
  },
};
