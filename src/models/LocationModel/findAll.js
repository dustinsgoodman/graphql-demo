import { findAll as repoFindAll } from 'Repos/LocationRepo';
import LocationModel from './LocationModel';

export const findAll = async ({ pagination = { page: 1, perPage: 10 } }) => {
  const locations = await repoFindAll({ pagination });
  return locations.map((location) => new LocationModel(location));
};
