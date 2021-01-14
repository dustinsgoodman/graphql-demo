import CharacterModel, { findAll } from 'Models/CharacterModel';
import { findAll as repoFindAll } from 'Repos/CharacterRepo';

jest.mock('Repos/CharacterRepo');

describe('.findAll', () => {
  let subject;

  describe('when characters are found', () => {
    beforeAll(async () => {
      repoFindAll.mockReturnValue([
        {
          dataValues: {
            name: 'Rick Sanchez',
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            gender: 'MALE',
            status: 'ALIVE',
            species: 'Human',
            type: '',
          },
        },
        {
          dataValues: {
            name: 'Morty Smith',
            image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
            gender: 'MALE',
            status: 'ALIVE',
            species: 'Human',
            type: '',
          },
        },
      ]);
      subject = await findAll();
    });

    test('returns array of CharacterModels', () => {
      expect(subject).toEqual([expect.any(CharacterModel), expect.any(CharacterModel)]);
    });
  });

  describe('when characters are not found', () => {
    beforeAll(async () => {
      repoFindAll.mockReturnValue([]);
      subject = await findAll();
    });

    test('returns empty array', () => {
      expect(subject).toEqual([]);
    });
  });
});
