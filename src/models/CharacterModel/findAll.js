import { findAll as repoFindAll } from 'Repos/CharacterRepo';
import CharacterModel from './CharacterModel';

export const findAll = async () => {
  const characters = await repoFindAll();
  return characters.map((character) => new CharacterModel(character));
};
