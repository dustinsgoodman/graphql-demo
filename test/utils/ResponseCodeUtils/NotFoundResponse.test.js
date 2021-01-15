import { NOT_FOUND, notFoundResponse } from 'Utils/ResponseCodeUtils';

describe('NOT_FOUND', () => {
  test('returns NOT_FOUND string', () => {
    expect(NOT_FOUND).toEqual('NOT_FOUND');
  });
});

describe('.notFoundResponse', () => {
  test('returns not found response object', () => {
    const subject = notFoundResponse(null);
    expect(subject.code).toEqual('NOT_FOUND');
    expect(subject.message).toBeNull();
    expect(subject.statusCode).toEqual(404);
  });
});
