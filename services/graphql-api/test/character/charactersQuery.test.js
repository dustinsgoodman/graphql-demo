import { gql } from 'apollo-server-lambda';
import { invoke } from 'Utils/LambdaUtils';
import generateTestClient from '../generateTestClient';

jest.mock('Utils/LambdaUtils');

describe('characters Query', () => {
  let subject;

  beforeAll(async () => {
    const QUERY = gql`
      query CharactersQuery {
        characters {
          id
          name
        }
      }
    `;

    const { query } = generateTestClient({});
    invoke.mockReturnValue({
      code: 'OK',
      message: [
        { id: 1, name: 'Rick' },
        { id: 2, name: 'Morty' },
      ],
      statusCode: 200,
    });
    subject = await query({
      query: QUERY,
    });
  });

  test('returns the HelloWorld string', () => {
    expect(subject.data).toEqual({
      characters: [
        { id: '1', name: 'Rick' },
        { id: '2', name: 'Morty' },
      ],
    });
  });
});
