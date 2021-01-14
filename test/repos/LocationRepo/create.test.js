import { create } from 'Repos/LocationRepo';
import { UnknownError } from 'Phrases/ErrorPhrases';
import { dbSetupAndTeardown, getConnection } from '../dbSetupAndTeardown';

dbSetupAndTeardown();

describe('.create', () => {
  let subject;
  let locationDoc;

  describe('when all arguments are valid', () => {
    beforeAll(async () => {
      locationDoc = {
        name: 'Earth (C-137)',
        type: 'Planet',
        dimension: 'Dimension C-137',
      };
      subject = await create(locationDoc);
    });

    test('creates the character', () => {
      expect(subject).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          ...locationDoc,
        })
      );
    });
  });

  describe('when some arguments are invalid', () => {
    beforeAll(async () => {
      locationDoc = {
        type: 'Planet',
        dimension: 'Dimension C-137',
      };
      subject = create(locationDoc);
    });

    test('throws exception', async () => {
      await expect(subject).rejects.toThrowError('Location.name cannot be null');
    });
  });

  describe('when no database connection', () => {
    beforeAll(async () => {
      await getConnection().drop();
      locationDoc = {
        name: 'Earth (C-137)',
        type: 'Planet',
        dimension: 'Dimension C-137',
      };
      subject = create(locationDoc);
    });

    test('throws exception', async () => {
      await expect(subject).rejects.toThrowError(UnknownError);
    });
  });
});
