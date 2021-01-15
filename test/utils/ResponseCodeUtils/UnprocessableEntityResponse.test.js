import { UNPROCESSABLE_ENTITY, unprocessableEntityResponse } from 'Utils/ResponseCodeUtils';

describe('UNPROCESSABLE_ENTITY', () => {
  test('returns UNPROCESSABLE_ENTITY string', () => {
    expect(UNPROCESSABLE_ENTITY).toEqual('UNPROCESSABLE_ENTITY');
  });
});

describe('.unprocessableEntityResponse', () => {
  test('returns unprocessable entity response object', () => {
    const subject = unprocessableEntityResponse('cannot process');
    expect(subject.code).toEqual('UNPROCESSABLE_ENTITY');
    expect(subject.message).toEqual('cannot process');
    expect(subject.statusCode).toEqual(422);
  });
});
