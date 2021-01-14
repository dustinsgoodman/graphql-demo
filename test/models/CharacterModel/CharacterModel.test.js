import CharacterModel from 'Models/CharacterModel';

describe('constructor', () => {
  let subject;

  beforeAll(() => {
    subject = new CharacterModel({});
  });

  test('remaps the data values onto the new instance', () => {
    expect(subject).toBeInstanceOf(CharacterModel);
  });
});

describe('#getUrl', () => {
  let subject;

  beforeAll(() => {
    const character = new CharacterModel({ id: 1 });
    subject = character.getUrl();
  });

  test('returns public url to entity', () => {
    expect(subject).toEqual('http://localhost:3000/character/1');
  });
});
