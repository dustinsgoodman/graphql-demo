import { countAll } from 'Models/CharacterModel';
import { countAll as repoCountAll } from 'Repos/CharacterRepo';

jest.mock('Repos/CharacterRepo');

describe('.countAll', () => {
  let subject;

  describe('when count is fetched', () => {
    beforeAll(async () => {
      repoCountAll.mockReturnValue(2);
      subject = await countAll();
    });

    test('returns count', () => {
      expect(subject).toEqual(2);
    });
  });

  describe('when error occurs', () => {
    beforeAll(async () => {
      repoCountAll.mockImplementation(() => {
        throw new Error('unknown');
      });
      subject = countAll();
    });

    test('throws generic error', async () => {
      await expect(subject).rejects.toThrowError();
    });
  });
});
