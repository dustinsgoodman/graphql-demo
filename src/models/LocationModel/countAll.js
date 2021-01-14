import { countAll as repoCountAll } from 'Repos/LocationRepo';

export const countAll = async () => {
  const characterCount = await repoCountAll();
  return characterCount;
};
