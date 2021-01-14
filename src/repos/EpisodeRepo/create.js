import { GenericError, ValidationError } from 'Errors';
import { collection } from './collection';

export const create = async (data) => {
  const { name, airDate, code } = data;

  try {
    const episode = await collection.create({ name, airDate, code });
    return episode;
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      const message = err.errors.map((e) => e.message).join(', ');
      throw new ValidationError(message);
    }
    throw new GenericError();
  }
};
