import { UnknownError } from 'Phrases/ErrorPhrases';
import { countAll, create, collection } from 'Repos/CharacterRepo';
import { dbSetupAndTeardown, getConnection } from '../dbSetupAndTeardown';

dbSetupAndTeardown();

describe('.countAll', () => {
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
      subject = await countAll();
    });

    test('returns count', () => {
      expect(subject).toEqual(2);
    });
  });

  describe('when unknown error occurs', () => {
    beforeAll(async () => {
      await getConnection().drop();
      subject = countAll();
    });

    test('throws error', async () => {
      await expect(subject).rejects.toThrowError(UnknownError);
    });
  });
});
