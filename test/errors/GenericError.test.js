import { GenericError } from 'Errors';
import { UnknownError } from 'Phrases/ErrorPhrases';

describe('GenericError', () => {
  let subject;

  describe('when using the default object', () => {
    beforeAll(() => {
      subject = new GenericError();
    });

    test('uses the default message', () => {
      expect(subject.message).toEqual(UnknownError);
    });

    test('uses the default code', () => {
      expect(subject.code).toEqual('UNKNOWN');
    });

    test('sets name to default', () => {
      expect(subject.name).toEqual('GenericError');
    });

    test('has no additional properties', () => {
      expect(subject.field).toBeUndefined();
    });
  });

  describe('when passing in custom variables', () => {
    const message = 'My custom message';
    const code = 'CUSTOM';
    const properties = {
      foo: 'bar',
    };

    beforeAll(() => {
      subject = new GenericError(message, code, properties);
    });

    test('uses the custom message', () => {
      expect(subject.message).toEqual(message);
    });

    test('uses the custom code', () => {
      expect(subject.code).toEqual(code);
    });

    test('sets name to default', () => {
      expect(subject.name).toEqual('GenericError');
    });

    test('sets the additional properties', () => {
      expect(subject.foo).toEqual('bar');
    });
  });
});
