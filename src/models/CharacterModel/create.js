import { create as repoCreate } from 'Repos/CharacterRepo';
import CharacterModel from './CharacterModel';

export const create = async ({
  name,
  image,
  gender,
  locationId,
  originId,
  status,
  species,
  type,
}) => {
  const record = await repoCreate({
    name,
    image,
    gender,
    locationId,
    originId,
    status,
    species,
    type,
  });
  return new CharacterModel(record);
};
