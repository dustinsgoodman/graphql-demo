import { findAll } from 'Models/CharacterModel';
import { okResponse } from 'Utils/ResponseCodeUtils';

export const main = async () => {
  const characters = await findAll();
  return okResponse(characters);
};
