import CharacterModel, { create } from 'Models/CharacterModel';
import { create as repoCreate } from 'Repos/CharacterRepo';

jest.mock('Repos/CharacterRepo');

describe('.create', () => {
  let subject;

  beforeAll(async () => {
    const characterDoc = {
      name: 'Rick Sanchez',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      gender: 'MALE',
      status: 'ALIVE',
      species: 'Human',
      type: '',
    };
    repoCreate.mockReturnValue({
      id: 1,
      ...characterDoc,
    });
    subject = await create({
      ...characterDoc,
    });
  });

  test('returns new character', () => {
    expect(subject).toEqual(expect.any(CharacterModel));
  });
});
