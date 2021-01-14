import { GenericError } from 'Errors';
import { collection } from './collection';

export const findAll = async () => {
  try {
    const records = await collection.findAll();
    return records.map((record) => record.dataValues);
  } catch (e) {
    throw new GenericError();
  }
};
