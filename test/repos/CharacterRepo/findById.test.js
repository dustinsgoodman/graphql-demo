import { UnknownError } from 'Phrases/ErrorPhrases';
import { findById, create, collection } from 'Repos/CharacterRepo';
import { dbSetupAndTeardown, getConnection } from '../dbSetupAndTeardown';

dbSetupAndTeardown();

describe('.findById', () => {
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
      subject = await findById(2);
    });

    test('returns all docs', () => {
      expect(subject).toEqual(expect.objectContaining({ id: 2, ...characterDoc2 }));
    });
  });

  describe('when unknown error occurs', () => {
    beforeAll(async () => {
      await getConnection().drop();
      subject = findById();
    });

    test('throws error', async () => {
      await expect(subject).rejects.toThrowError(UnknownError);
    });
  });
});
