import CharacterModel from 'Models/CharacterModel';
import { findAll, countAll } from 'Repos/CharacterRepo';
import { INTERNAL_ERROR, OK } from 'Utils/ResponseCodeUtils';
import { main as lambda } from '../src/handlers/characters';

jest.mock('Repos/CharacterRepo');

describe('.characters', () => {
  let subject;

  describe('when fetches data successfully', () => {
    beforeAll(async () => {
      findAll.mockReturnValue([
        { id: 1, name: 'Rick' },
        { id: 2, name: 'Morty' },
      ]);
      countAll.mockReturnValue(2);
      const event = {
        body: JSON.stringify({}),
      };
      subject = await lambda(event);
    });

    afterAll(() => {
      findAll.mockReset();
      countAll.mockReset();
    });

    test('returns OK code', () => {
      expect(subject.code).toBe(OK);
    });

    test('returns paginated characters data', () => {
      expect(subject.message).toEqual({
        nodes: expect.arrayContaining([expect.any(CharacterModel), expect.any(CharacterModel)]),
        pageInfo: {
          page: 1,
          perPage: 10,
          total: 2,
          totalPages: 1,
        },
      });
    });

    test('returns 200 statusCode', () => {
      expect(subject.statusCode).toBe(200);
    });
  });

  describe('when unknown error occurs', () => {
    beforeAll(async () => {
      findAll.mockImplementation(() => {
        throw new Error('unknown');
      });
      countAll.mockReturnValue(2);
      const event = {
        body: JSON.stringify({}),
      };
      subject = await lambda(event);
    });

    afterAll(() => {
      findAll.mockReset();
      countAll.mockReset();
    });

    test('returns INTERNAL_ERROR code', () => {
      expect(subject.code).toBe(INTERNAL_ERROR);
    });

    test('returns error message', () => {
      expect(subject.message).toEqual('unknown');
    });

    test('returns 500 statusCode', () => {
      expect(subject.statusCode).toBe(500);
    });
  });
});
