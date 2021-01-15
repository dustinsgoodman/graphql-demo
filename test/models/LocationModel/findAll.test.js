import LocationModel, { findAll } from 'Models/LocationModel';
import { findAll as repoFindAll } from 'Repos/LocationRepo';

jest.mock('Repos/LocationRepo');

describe('.findAll', () => {
  let subject;

  describe('when locations are found', () => {
    beforeAll(async () => {
      repoFindAll.mockReturnValue([
        {
          dataValues: {
            id: 1,
            name: 'Earth (C-137)',
            type: 'Planet',
            dimension: 'Dimension C-137',
            createdAt: new Date('2020-12-16T18:21:40.008Z'),
            updatedAt: new Date('2020-12-16T18:21:40.008Z'),
          },
        },
        {
          dataValues: {
            id: 2,
            name: 'Abadango',
            type: 'Cluster',
            dimension: 'unknown',
            createdAt: new Date('2020-12-16T18:21:40.021Z'),
            updatedAt: new Date('2020-12-16T18:21:40.021Z'),
          },
        },
      ]);
      subject = await findAll();
    });

    test('returns array of LocationModels', () => {
      expect(subject).toEqual([expect.any(LocationModel), expect.any(LocationModel)]);
    });
  });

  describe('when locations are not found', () => {
    beforeAll(async () => {
      repoFindAll.mockReturnValue([]);
      subject = await findAll();
    });

    test('returns empty array', () => {
      expect(subject).toEqual([]);
    });
  });
});
