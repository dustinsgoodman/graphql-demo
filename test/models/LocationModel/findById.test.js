import { findById as repoFindById } from 'Repos/LocationRepo';
import LocationModel, { findById } from 'Models/LocationModel';
import { LocationPhrases } from 'Phrases';

jest.mock('Repos/LocationRepo');

describe('.location', () => {
  let subject;

  describe('when no ID is passed', () => {
    beforeAll(() => {
      subject = findById();
    });

    test('throws ValidationError', async () => {
      await expect(subject).rejects.toThrowError(LocationPhrases.Validations.Id);
    });
  });

  describe('when location is found', () => {
    beforeAll(async () => {
      const locationData = { id: 1, name: 'Earth (C-137)' };
      repoFindById.mockReturnValue(locationData);
      subject = await findById(1);
    });

    afterAll(() => {
      repoFindById.mockReset();
    });

    test('returns LocationModel', () => {
      expect(subject).toBeInstanceOf(LocationModel);
    });
  });
});
