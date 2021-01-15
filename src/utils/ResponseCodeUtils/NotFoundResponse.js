import { makeResponse } from './_makeResponse';

export const NOT_FOUND = 'NOT_FOUND';
export const notFoundResponse = (message) => makeResponse(NOT_FOUND, message, 404);
