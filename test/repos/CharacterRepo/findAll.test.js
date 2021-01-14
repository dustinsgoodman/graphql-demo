import { UnknownError } from 'Phrases/ErrorPhrases';
import { findAll, create } from 'Repos/CharacterRepo';
import { dbSetupAndTeardown, getConnection } from '../dbSetupAndTeardown';

dbSetupAndTeardown();

describe('.findAll', () => {
  let subject;
  let characterDoc1;
  let characterDoc2;

  beforeAll(() => {
    characterDoc1 = {
      name: 'Rick Sanchez',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      gender: 'MALE',
      status: 'ALIVE',
      species: 'Human',
      type: '',
    };
    create(characterDoc1);
    characterDoc2 = {
      name: 'Morty Smith',
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      gender: 'MALE',
      status: 'ALIVE',
      species: 'Human',
      type: '',
    };
    create(characterDoc2);
  });

  describe('when retrieves successfully', () => {
    beforeAll(async () => {
      subject = await findAll();
    });

    test('returns all docs', () => {
      expect(subject).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: expect.any(Number), ...characterDoc1 }),
          expect.objectContaining({ id: expect.any(Number), ...characterDoc2 }),
        ])
      );
    });
  });

  describe('when unknown error occurs', () => {
    beforeAll(async () => {
      await getConnection().drop();
      subject = findAll();
    });

    test('throws error', async () => {
      await expect(subject).rejects.toThrowError(UnknownError);
    });
  });
});
