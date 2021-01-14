import { makeResponse } from './_makeResponse';

export const INTERNAL_ERROR = 'INTERNAL_ERROR';
export const internalErrorResponse = (message) => makeResponse(INTERNAL_ERROR, message, 500);
