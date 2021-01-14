import { buildPublicUrl } from 'Helpers/UrlHelper';

describe('.buildPublicUrl', () => {
  let subject;

  beforeAll(() => {
    subject = buildPublicUrl('character/1');
  });

  test('returns the url for the given path', () => {
    expect(subject).toEqual('http://localhost:3000/character/1');
  });
});
