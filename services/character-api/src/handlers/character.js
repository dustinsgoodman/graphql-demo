import { findById } from 'Models/CharacterModel';
import { ValidationError } from 'Errors';
import { badRequestResponse, internalErrorResponse, okResponse } from 'Utils/ResponseCodeUtils';

export const main = async (event) => {
  const { characterId } = JSON.parse(event.body);

  try {
    const character = await findById(characterId);
    return okResponse(character);
  } catch (err) {
    if (err instanceof ValidationError) {
      return badRequestResponse(err.message);
    }

    return internalErrorResponse(err.message);
  }
};
