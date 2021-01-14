import { GenericError } from 'Errors';
import { collection } from './collection';

export const findById = async (id) => {
  try {
    const record = await collection.findByPk(id);
    return record.dataValues;
  } catch (e) {
    console.log(e);
    throw new GenericError();
  }
};
