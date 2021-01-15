import { AuthenticationRequiredError } from 'Phrases';
import { makeResponse } from './_makeResponse';

export const AUTHENTICATION_REQUIRED = 'AUTHENTICATION_REQUIRED';
export const authenticationRequiredResponse = () =>
  makeResponse(AUTHENTICATION_REQUIRED, AuthenticationRequiredError, 401);
