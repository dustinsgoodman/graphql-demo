import { ValidationError } from 'Errors';

describe('ValidationError', () => {
  let error;

  beforeAll(() => {
    error = new ValidationError('Failed validation');
  });

  test('uses the pased in message', () => {
    expect(error.message).toBe('Failed validation');
  });

  test('sets code', () => {
    expect(error.code).toBe('VALIDATION_ERROR');
  });

  test('sets name', () => {
    expect(error.name).toBe('ValidationError');
  });
});
