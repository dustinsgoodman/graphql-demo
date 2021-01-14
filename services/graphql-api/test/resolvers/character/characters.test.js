import { invoke } from 'Utils/LambdaUtils';
import { characters } from '../../../src/resolvers/character/characters';

jest.mock('Utils/LambdaUtils');

describe('.characters', () => {
  let subject;

  describe('when lambda returns 200', () => {
    beforeAll(async () => {
      invoke.mockReturnValue({
        code: 'OK',
        message: [
          { id: 1, name: 'Rick' },
          { id: 2, name: 'Morty' },
        ],
        statusCode: 200,
      });
      subject = await characters({}, {}, {});
    });

    test('returns data', () => {
      expect(subject).toEqual([
        { id: 1, name: 'Rick' },
        { id: 2, name: 'Morty' },
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
      subject = characters({}, {}, {});
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
      subject = characters({}, {}, {});
    });

    test('throws error', async () => {
      await expect(subject).rejects.toThrowError('Unknown error');
    });
  });
});
