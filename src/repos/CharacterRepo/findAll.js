import { GenericError } from 'Errors';
import { collection } from './collection';

export const findAll = async ({ pagination }) => {
  const { page, perPage } = pagination;
  try {
    const records = await collection.findAll({
      limit: perPage,
      offset: (page - 1) * perPage,
    });
    return records.map((record) => record.dataValues);
  } catch (e) {
    throw new GenericError();
  }
};
