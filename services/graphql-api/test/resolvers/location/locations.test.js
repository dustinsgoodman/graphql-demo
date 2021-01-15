import { invoke } from 'Utils/LambdaUtils';
import { locations } from '../../../src/resolvers/location/locations';

jest.mock('Utils/LambdaUtils');

describe('.locations', () => {
  let subject;

  describe('when lambda returns 200', () => {
    beforeAll(async () => {
      invoke.mockReturnValue({
        code: 'OK',
        message: [
          { id: 1, name: 'Earth 1' },
          { id: 2, name: 'Earth 2' },
        ],
        statusCode: 200,
      });
      subject = await locations({}, {}, {});
    });

    test('returns data', () => {
      expect(subject).toEqual([
        { id: 1, name: 'Earth 1' },
        { id: 2, name: 'Earth 2' },
      ]);
    });
  });

  describe('when lambda returns a 400', () => {
    beforeAll(async () => {
      invoke.mockReturnValue({
        code: 'BAD_REQUEST',
        message: 'Pagination missing',
        statusCode: 400,
      });
      subject = locations({}, {}, {});
    });

    test('throws error', async () => {
      await expect(subject).rejects.toThrowError('Pagination missing');
    });
  });

  describe('when lambda returns a 500', () => {
    beforeAll(async () => {
      invoke.mockReturnValue({
        code: 'GENERIC_ERROR',
        message: 'Unknown error',
        statusCode: 500,
      });
      subject = locations({}, {}, {});
    });

    test('throws error', async () => {
      await expect(subject).rejects.toThrowError('Unknown error');
    });
  });
});
