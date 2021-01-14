import BaseModel from 'Models/BaseModel';

describe('constructor', () => {
  let subject;

  beforeAll(() => {
    subject = new BaseModel({ a: 1, b: 2, c: 3 });
  });

  test('remaps the data values onto the new instance', () => {
    expect(subject).toBeInstanceOf(BaseModel);
    expect(subject.a).toBe(1);
    expect(subject.b).toBe(2);
    expect(subject.c).toBe(3);
  });
});
