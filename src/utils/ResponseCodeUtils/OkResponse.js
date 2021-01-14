import { makeResponse } from './_makeResponse';

export const OK = 'OK';
export const okResponse = (message) => makeResponse(OK, message, 200);
