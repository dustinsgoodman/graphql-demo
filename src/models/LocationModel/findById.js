import { findById as repoFindById } from 'Repos/CharacterRepo';
import { LocationPhrases } from 'Phrases';
import { ValidationError } from 'Errors';
import LocationModel from './LocationModel';

export const findById = async (id) => {
  if (!id) {
    throw new ValidationError(LocationPhrases.Validations.Id);
  }

  const character = await repoFindById(id);
  return new LocationModel(character);
};
