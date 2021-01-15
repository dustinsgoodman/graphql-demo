import { countAll, create, collection } from 'Repos/LocationRepo';
import { UnknownError } from 'Phrases/ErrorPhrases';
import { dbSetupAndTeardown, getConnection } from '../dbSetupAndTeardown';

dbSetupAndTeardown();

describe('.countAll', () => {
  let subject;
  let locationDoc1;
  let locationDoc2;

  beforeAll(() => {
    locationDoc1 = {
      name: 'Abadango',
      type: 'Cluster',
      dimension: null,
    };
    create(locationDoc1);
    locationDoc2 = {
      name: 'Earth (C-137)',
      type: 'Planet',
      dimension: 'Dimension C-137',
    };
    create(locationDoc2);
  });

  afterAll(() => {
    collection.sync({ force: true });
  });

  describe('when retrieves successfully', () => {
    beforeAll(async () => {
      subject = await countAll();
    });

    test('returns the count', () => {
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
