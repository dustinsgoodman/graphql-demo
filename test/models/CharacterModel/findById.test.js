import { findById as repoFindById } from 'Repos/CharacterRepo';
import CharacterModel, { findById } from 'Models/CharacterModel';
import { CharacterPhrases } from 'Phrases';

jest.mock('Repos/CharacterRepo');

describe('.location', () => {
  let subject;

  describe('when no ID is passed', () => {
    beforeAll(() => {
      subject = findById();
    });

    test('throws ValidationError', async () => {
      await expect(subject).rejects.toThrowError(CharacterPhrases.Validations.Id);
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

    test('returns CharacterModel', () => {
      expect(subject).toBeInstanceOf(CharacterModel);
    });
  });
});
