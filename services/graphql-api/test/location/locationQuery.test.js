import { gql } from 'apollo-server-lambda';
import { invoke } from 'Utils/LambdaUtils';
import generateTestClient from '../generateTestClient';

jest.mock('Utils/LambdaUtils');

describe('location Query', () => {
  let subject;

  describe('when successful', () => {
    beforeAll(async () => {
      const QUERY = gql`
        query LocationQuery {
          location(id: 1) {
            id
            name
          }
        }
      `;

      const { query } = generateTestClient({});
      invoke.mockReturnValue({
        code: 'OK',
        message: { id: 1, name: 'Earth C-137' },
        statusCode: 200,
      });
      subject = await query({
        query: QUERY,
      });
    });

    test('returns location data', () => {
      expect(subject.data).toEqual({
        location: { id: '1', name: 'Earth C-137' },
      });
    });
  });

  describe('when bad input', () => {
    beforeAll(async () => {
      const QUERY = gql`
        query LocationQuery {
          location(id: -1) {
            id
            name
          }
        }
      `;

      const { query } = generateTestClient({});
      invoke.mockReturnValue({
        code: 'BAD_REQUEST',
        message: 'ID must be positive',
        statusCode: 400,
      });
      subject = await query({
        query: QUERY,
      });
    });

    test('does not return data', () => {
      expect(subject.data).toEqual({
        location: null,
      });
    });

    test('returns errors', () => {
      expect(subject.errors[0].message).toEqual('ID must be positive');
    });
  });

  describe('when error occurs', () => {
    beforeAll(async () => {
      const QUERY = gql`
        query LocationQuery {
          location(id: 1) {
            id
            name
          }
        }
      `;

      const { query } = generateTestClient({});
      invoke.mockReturnValue({
        code: 'INTERNAL_ERROR',
        message: 'unknown',
        statusCode: 500,
      });
      subject = await query({
        query: QUERY,
      });
    });

    test('does not return data', () => {
      expect(subject.data).toEqual({
        location: null,
      });
    });

    test('returns errors', () => {
      expect(subject.errors[0].message).toEqual('unknown');
    });
  });
});
