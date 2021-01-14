import { GenericError } from 'Errors';
import { collection } from './collection';

export const findAll = async ({ pagination = {} } = {}) => {
  const { page, perPage } = pagination;
  try {
    const options = {};
    if (page && perPage) {
      options.limit = perPage;
      options.offset = (page - 1) * perPage;
    }
    const records = await collection.findAll(options);
    return records.map((record) => record.dataValues);
  } catch (e) {
    throw new GenericError();
  }
};
