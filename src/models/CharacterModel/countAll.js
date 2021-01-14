import { countAll as repoCountAll } from 'Repos/CharacterRepo';

export const countAll = async () => {
  const characterCount = await repoCountAll();
  return characterCount;
};
