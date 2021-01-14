import { findAll } from 'Models/CharacterModel';

export const main = async () => {
  const characters = await findAll();
  return {
    code: 'OK',
    message: characters,
    statusCode: 200,
  };
};
