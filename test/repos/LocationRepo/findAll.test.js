import { findAll, create } from 'Repos/LocationRepo';
import { UnknownError } from 'Phrases/ErrorPhrases';
import { dbSetupAndTeardown, getConnection } from '../dbSetupAndTeardown';

dbSetupAndTeardown();

describe('.findAll', () => {
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

  describe('when retrieves successfully', () => {
    beforeAll(async () => {
      subject = await findAll();
    });

    test('returns all docs', () => {
      expect(subject).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            ...locationDoc1,
          }),
          expect.objectContaining({
            id: expect.any(Number),
            ...locationDoc2,
          }),
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
