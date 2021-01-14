import { GenericError, ValidationError } from 'Errors';
import { collection } from './collection';

export const create = async (data) => {
  const { name, image, gender, locationId, originId, status, species, type } = data;

  try {
    const character = await collection.create({
      name,
      image,
      gender,
      locationId,
      originId,
      status,
      species,
      type,
    });
    return character;
  } catch (err) {
    console.error(err);
    if (err.name === 'SequelizeValidationError') {
      const message = err.errors.map((e) => e.message).join(', ');
      throw new ValidationError(message);
    }
    throw new GenericError();
  }
};
