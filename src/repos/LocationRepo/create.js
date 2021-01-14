import { GenericError, ValidationError } from 'Errors';
import { collection } from './collection';

export const create = async (data) => {
  const { name, type, dimension } = data;

  try {
    const location = await collection.create({ name, type, dimension });
    return location;
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      const message = err.errors.map((e) => e.message).join(', ');
      throw new ValidationError(message);
    }
    throw new GenericError();
  }
};
