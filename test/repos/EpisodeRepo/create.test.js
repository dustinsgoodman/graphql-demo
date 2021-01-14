import { create } from 'Repos/EpisodeRepo';
import { UnknownError } from 'Phrases/ErrorPhrases';
import { dbSetupAndTeardown, getConnection } from '../dbSetupAndTeardown';

dbSetupAndTeardown();

describe('.create', () => {
  let subject;
  let episodeDoc;

  describe('when all arguments are valid', () => {
    beforeAll(async () => {
      episodeDoc = {
        code: 'S01E01',
        airDate: '2013-12-02',
        name: 'Pilot',
      };
      subject = await create(episodeDoc);
    });

    test('creates the character', () => {
      expect(subject).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          ...episodeDoc,
        })
      );
    });
  });

  describe('when some arguments are invalid', () => {
    beforeAll(async () => {
      episodeDoc = {
        code: 'S01E01',
        airDate: '2013-12-02',
      };
      subject = create(episodeDoc);
    });

    test('throws exception', async () => {
      await expect(subject).rejects.toThrowError('Episode.name cannot be null');
    });
  });

  describe('when no database connection', () => {
    beforeAll(async () => {
      await getConnection().drop();
      episodeDoc = {
        code: 'S01E01',
        airDate: '2013-12-02',
        name: 'Pilot',
      };
      subject = create(episodeDoc);
    });

    test('throws exception', async () => {
      await expect(subject).rejects.toThrowError(UnknownError);
    });
  });
});
