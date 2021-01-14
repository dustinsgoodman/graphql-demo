import { UnknownError } from 'Phrases/ErrorPhrases';
import { findAll, create } from 'Repos/EpisodeRepo';
import { dbSetupAndTeardown, getConnection } from '../dbSetupAndTeardown';

dbSetupAndTeardown();

describe('.findAll', () => {
  let subject;
  let episodeDoc1;
  let episodeDoc2;

  beforeAll(() => {
    episodeDoc1 = {
      code: 'S01E01',
      airDate: 'December 2, 2013',
      name: 'Pilot',
    };
    create(episodeDoc1);
    episodeDoc2 = {
      code: 'S01E02',
      airDate: 'December 9, 2013',
      name: 'Lawnmower Dog',
    };
    create(episodeDoc2);
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
            ...episodeDoc1,
            airDate: '2013-12-02',
          }),
          expect.objectContaining({
            id: expect.any(Number),
            ...episodeDoc2,
            airDate: '2013-12-09',
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
