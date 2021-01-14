import { create } from 'Repos/CharacterRepo';
import { UnknownError } from 'Phrases/ErrorPhrases';
import { dbSetupAndTeardown, getConnection } from '../dbSetupAndTeardown';

dbSetupAndTeardown();

describe('.create', () => {
  let subject;
  let characterDoc;

  describe('when all arguments are valid', () => {
    beforeAll(async () => {
      characterDoc = {
        name: 'Rick Sanchez',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        gender: 'MALE',
        status: 'ALIVE',
        species: 'Human',
        type: '',
      };
      subject = await create(characterDoc);
    });

    test('creates the character', () => {
      expect(subject).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          originId: undefined,
          locationId: undefined,
          ...characterDoc,
        })
      );
    });
  });

  describe('when some arguments are invalid', () => {
    beforeAll(async () => {
      characterDoc = {
        name: 'Rick Sanchez',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        gender: 'male',
        status: 'alive',
        species: 'Human',
        type: '',
      };
      subject = create(characterDoc);
    });

    test('throws exception', async () => {
      await expect(subject).rejects.toThrowError(
        "Gender must be one of: 'FEMALE', 'MALE', 'GENDERLESS', or null. Received: male, Status must be one of: 'ALIVE', 'DEAD', or null. Received: alive"
      );
    });
  });

  describe('when no database connection', () => {
    beforeAll(async () => {
      await getConnection().drop();
      characterDoc = {
        name: 'Rick Sanchez',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        gender: 'MALE',
        status: 'ALIVE',
        species: 'Human',
        type: '',
      };
      subject = create(characterDoc);
    });

    test('throws exception', async () => {
      await expect(subject).rejects.toThrowError(UnknownError);
    });
  });
});
