import { findById as repoFindById } from 'Repos/CharacterRepo';
import { CharacterPhrases } from 'Phrases';
import { ValidationError } from 'Errors';
import CharacterModel from './CharacterModel';

export const findById = async (id) => {
  if (!id) {
    throw new ValidationError(CharacterPhrases.Validations.Id);
  }

  const character = await repoFindById(id);
  return new CharacterModel(character);
};
