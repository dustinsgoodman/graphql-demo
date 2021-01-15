import { findById, create, collection } from 'Repos/LocationRepo';
import { UnknownError } from 'Phrases/ErrorPhrases';
import { dbSetupAndTeardown, getConnection } from '../dbSetupAndTeardown';

dbSetupAndTeardown();

describe('.findById', () => {
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
      subject = await findById(1);
    });

    test('returns all docs', () => {
      expect(subject).toEqual(
        expect.objectContaining({
          id: 1,
          ...locationDoc1,
        })
      );
    });
  });

  describe('when unknown error occurs', () => {
    beforeAll(async () => {
      await getConnection().drop();
      subject = findById(1);
    });

    test('throws error', async () => {
      await expect(subject).rejects.toThrowError(UnknownError);
    });
  });
});
