import { AUTHENTICATION_REQUIRED, authenticationRequiredResponse } from 'Utils/ResponseCodeUtils';
import { AuthenticationRequiredError } from 'Phrases';

describe('AUTHENTICATION_REQUIRED', () => {
  test('returns AUTHENTICATION_REQUIRED string', () => {
    expect(AUTHENTICATION_REQUIRED).toEqual('AUTHENTICATION_REQUIRED');
  });
});

describe('.authenticationRequiredResponse', () => {
  test('returns auth required response object', () => {
    const subject = authenticationRequiredResponse();
    expect(subject.code).toEqual('AUTHENTICATION_REQUIRED');
    expect(subject.message).toEqual(AuthenticationRequiredError);
    expect(subject.statusCode).toEqual(401);
  });
});
