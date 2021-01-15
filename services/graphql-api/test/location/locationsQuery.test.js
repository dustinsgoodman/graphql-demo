import { gql } from 'apollo-server-lambda';
import { invoke } from 'Utils/LambdaUtils';
import generateTestClient from '../generateTestClient';

jest.mock('Utils/LambdaUtils');

describe('locations Query', () => {
  let subject;

  beforeAll(async () => {
    const QUERY = gql`
      query LocationsQuery {
        locations {
          nodes {
            id
            name
          }
        }
      }
    `;

    const { query } = generateTestClient({});
    invoke.mockReturnValue({
      code: 'OK',
      message: {
        nodes: [
          { id: 1, name: 'Earth 1' },
          { id: 2, name: 'Earth 2' },
        ],
      },
      statusCode: 200,
    });
    subject = await query({
      query: QUERY,
    });
  });

  test('returns paginated character data', () => {
    expect(subject.data).toEqual({
      locations: {
        nodes: [
          { id: '1', name: 'Earth 1' },
          { id: '2', name: 'Earth 2' },
        ],
      },
    });
  });
});
