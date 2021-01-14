import { makeResponse } from './_makeResponse';

export const BAD_REQUEST = 'BAD_REQUEST';
export const badRequestResponse = (message) => makeResponse(BAD_REQUEST, message, 400);
