import CharacterModel from 'Models/CharacterModel';
import { findAll } from 'Repos/CharacterRepo';
import { main as lambda } from '../src/handlers/getCharacters';

jest.mock('Repos/CharacterRepo');

describe('.getCharacters', () => {
  let subject;

  beforeAll(async () => {
    findAll.mockReturnValue([
      { id: 1, name: 'Rick' },
      { id: 2, name: 'Morty' },
    ]);
    subject = await lambda();
  });

  test('returns characters data', () => {
    expect(subject.code).toBe('OK');
    expect(subject.message).toEqual(
      expect.arrayContaining([expect.any(CharacterModel), expect.any(CharacterModel)])
    );
    expect(subject.statusCode).toBe(200);
  });
});
