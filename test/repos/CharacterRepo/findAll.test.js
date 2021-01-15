import { UnknownError } from 'Phrases/ErrorPhrases';
import { findAll, create, collection } from 'Repos/CharacterRepo';
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

  afterAll(() => {
    collection.sync({ force: true });
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

  describe('when pagination', () => {
    beforeAll(async () => {
      subject = await findAll({ pagination: { page: 2, perPage: 1 } });
    });

    test('returns specified page results', () => {
      expect(subject).toEqual(
        expect.arrayContaining([
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
