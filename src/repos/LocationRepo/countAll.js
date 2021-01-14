import { GenericError } from 'Errors';
import { collection } from './collection';

export const countAll = async () => {
  try {
    const count = await collection.count();
    return count;
  } catch (e) {
    throw new GenericError();
  }
};
