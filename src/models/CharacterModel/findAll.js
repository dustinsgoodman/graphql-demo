import { findAll as repoFindAll } from 'Repos/CharacterRepo';
import CharacterModel from './CharacterModel';

export const findAll = async ({ pagination = { page: 1, perPage: 10 } }) => {
  const characters = await repoFindAll({ pagination });
  return characters.map((character) => new CharacterModel(character));
};
