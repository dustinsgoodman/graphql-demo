import { PERMISSION_DENIED, permissionDeniedResponse } from 'Utils/ResponseCodeUtils';

describe('PERMISSION_DENIED', () => {
  test('returns PERMISSION_DENIED string', () => {
    expect(PERMISSION_DENIED).toEqual('PERMISSION_DENIED');
  });
});

describe('.permissionDeniedResponse', () => {
  test('returns permission denied response object', () => {
    const subject = permissionDeniedResponse('perm denied');
    expect(subject.code).toEqual('PERMISSION_DENIED');
    expect(subject.message).toEqual('perm denied');
    expect(subject.statusCode).toEqual(403);
  });
});
