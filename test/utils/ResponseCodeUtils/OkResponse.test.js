import { OK, okResponse } from 'Utils/ResponseCodeUtils';

describe('OK', () => {
  test('returns OK string', () => {
    expect(OK).toEqual('OK');
  });
});

describe('.okResponse', () => {
  test('returns ok response object', () => {
    const subject = okResponse('data');
    expect(subject.code).toEqual('OK');
    expect(subject.message).toEqual('data');
    expect(subject.statusCode).toEqual(200);
  });
});
