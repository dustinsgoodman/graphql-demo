import { countAll } from 'Models/LocationModel';
import { countAll as repoCountAll } from 'Repos/LocationRepo';

jest.mock('Repos/LocationRepo');

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
