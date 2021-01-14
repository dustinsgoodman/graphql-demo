import { makeResponse } from './_makeResponse';

export const UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY';
export const unprocessableEntityResponse = (message) =>
  makeResponse(UNPROCESSABLE_ENTITY, message, 422);
