import { INTERNAL_ERROR, internalErrorResponse } from 'Utils/ResponseCodeUtils';

describe('INTERNAL_ERROR', () => {
  test('returns INTERNAL_ERROR string', () => {
    expect(INTERNAL_ERROR).toEqual('INTERNAL_ERROR');
  });
});

describe('.internalErrorResponse', () => {
  test('returns internal error response object', () => {
    const subject = internalErrorResponse('generic error');
    expect(subject.code).toEqual('INTERNAL_ERROR');
    expect(subject.message).toEqual('generic error');
    expect(subject.statusCode).toEqual(500);
  });
});
