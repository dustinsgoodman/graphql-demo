import { makeResponse } from './_makeResponse';

export const PERMISSION_DENIED = 'PERMISSION_DENIED';
export const permissionDeniedResponse = (message) => makeResponse(PERMISSION_DENIED, message, 403);
