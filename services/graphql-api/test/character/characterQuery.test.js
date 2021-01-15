import { gql } from 'apollo-server-lambda';
import { invoke } from 'Utils/LambdaUtils';
import generateTestClient from '../generateTestClient';

jest.mock('Utils/LambdaUtils');

describe('character Query', () => {
  let subject;

  describe('when successful', () => {
    beforeAll(async () => {
      const QUERY = gql`
        query CharacterQuery {
          character(id: 1) {
            id
            name
            origin {
              id
            }
            currentLocation {
              id
            }
          }
        }
      `;

      const { query } = generateTestClient({});
      invoke
        .mockReturnValueOnce({
          code: 'OK',
          message: { id: 1, name: 'Rick' },
          statusCode: 200,
        })
        .mockReturnValueOnce({
          code: 'OK',
          message: { id: 2, name: 'Earth 1' },
          statusCode: 200,
        })
        .mockReturnValueOnce({
          code: 'OK',
          message: { id: 3, name: 'Earth 3' },
          statusCode: 200,
        });
      subject = await query({
        query: QUERY,
      });
    });

    test('returns paginated character data', () => {
      expect(subject.data).toEqual({
        character: {
          id: '1',
          name: 'Rick',
          origin: {
            id: '2',
          },
          currentLocation: {
            id: '3',
          },
        },
      });
    });
  });

  describe('when bad input', () => {
    beforeAll(async () => {
      const QUERY = gql`
        query CharacterQuery {
          character(id: -1) {
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
        character: null,
      });
    });

    test('returns errors', () => {
      expect(subject.errors[0].message).toEqual('ID must be positive');
    });
  });

  describe('when error occurs', () => {
    beforeAll(async () => {
      const QUERY = gql`
        query CharacterQuery {
          character(id: 1) {
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
        character: null,
      });
    });

    test('returns errors', () => {
      expect(subject.errors[0].message).toEqual('unknown');
    });
  });
});
