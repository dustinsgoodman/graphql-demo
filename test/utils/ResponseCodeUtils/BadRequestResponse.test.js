import { BAD_REQUEST, badRequestResponse } from 'Utils/ResponseCodeUtils';

describe('BAD_REQUEST', () => {
  test('returns BAD_REQUEST string', () => {
    expect(BAD_REQUEST).toEqual('BAD_REQUEST');
  });
});

describe('.badRequestResponse', () => {
  test('returns bad request response object', () => {
    const subject = badRequestResponse('bad request');
    expect(subject.code).toEqual('BAD_REQUEST');
    expect(subject.message).toEqual('bad request');
    expect(subject.statusCode).toEqual(400);
  });
});
