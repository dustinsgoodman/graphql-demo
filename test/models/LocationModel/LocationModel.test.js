import LocationModel from 'Models/LocationModel';

describe('constructor', () => {
  let subject;

  beforeAll(() => {
    subject = new LocationModel({});
  });

  test('remaps the data values onto the new instance', () => {
    expect(subject).toBeInstanceOf(LocationModel);
  });
});

describe('#getUrl', () => {
  let subject;

  beforeAll(() => {
    const location = new LocationModel({ id: 1 });
    subject = location.getUrl();
  });

  test('returns public url to entity', () => {
    expect(subject).toEqual('http://localhost:3000/location/1');
  });
});
