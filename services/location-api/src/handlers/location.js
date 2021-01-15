import { findById } from 'Models/LocationModel';
import { ValidationError } from 'Errors';
import { badRequestResponse, internalErrorResponse, okResponse } from 'Utils/ResponseCodeUtils';

export const main = async (event) => {
  const { locationId } = JSON.parse(event.body);

  try {
    const location = await findById(locationId);
    return okResponse(location);
  } catch (err) {
    if (err instanceof ValidationError) {
      return badRequestResponse(err.message);
    }

    return internalErrorResponse(err.message);
  }
};
