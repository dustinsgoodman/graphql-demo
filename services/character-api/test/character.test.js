import { OK, BAD_REQUEST, INTERNAL_ERROR } from 'Utils/ResponseCodeUtils';
import { findById } from 'Repos/CharacterRepo';
import CharacterModel from 'Models/CharacterModel';
import { CharacterPhrases } from 'Phrases';
import { main as lambda } from '../src/handlers/character';

jest.mock('Repos/CharacterRepo');

describe('.character', () => {
  let subject;

  describe('when no ID is passed', () => {
    beforeAll(async () => {
      const event = {
        body: JSON.stringify({}),
      };
      subject = await lambda(event, {});
    });

    test('returns BAD_REQUEST code', () => {
      expect(subject.code).toBe(BAD_REQUEST);
    });

    test('returns missing id message', () => {
      expect(subject.message).toBe(CharacterPhrases.Validations.Id);
    });

    test('returns 400 statusCode', async () => {
      expect(subject.statusCode).toBe(400);
    });
  });

  describe('when character is found', () => {
    beforeAll(async () => {
      const characterData = { id: 1, name: 'Rick' };
      findById.mockReturnValue(characterData);
      const event = {
        body: JSON.stringify({ characterId: 1 }),
      };
      subject = await lambda(event, {});
    });

    afterAll(() => {
      findById.mockReset();
    });

    test('returns OK code', () => {
      expect(subject.code).toBe(OK);
    });

    test('returns character record', () => {
      expect(subject.message).toBeInstanceOf(CharacterModel);
    });

    test('returns 200 statusCode', async () => {
      expect(subject.statusCode).toBe(200);
    });
  });

  describe('when unknown error occurs', () => {
    beforeAll(async () => {
      findById.mockImplementation(() => {
        throw new Error('unknown');
      });
      const event = {
        body: JSON.stringify({ characterId: 1 }),
      };
      subject = await lambda(event, {});
    });

    afterAll(() => {
      findById.mockReset();
    });

    test('returns INTERNAL_ERROR code', () => {
      expect(subject.code).toBe(INTERNAL_ERROR);
    });

    test('returns error message', () => {
      expect(subject.message).toEqual('unknown');
    });

    test('returns 500 statusCode', async () => {
      expect(subject.statusCode).toBe(500);
    });
  });
});
