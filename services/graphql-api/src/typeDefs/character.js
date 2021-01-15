import { gql } from 'apollo-server-lambda';

export const characterTypeDef = gql`
  """
  Defines Character type for API
  """
  type Character {
    "Unique identifier"
    id: ID
    "Human readable name"
    name: String
  }

  """
  Character repsonse object for pagination
  """
  type CharacterConnection {
    "List of characters"
    nodes: [Character]
    "Pagination information"
    pageInfo: PageInfo
  }

  extend type Query {
    "Returns a list of all the characters"
    characters(pagination: PaginationInput): CharacterConnection
  }
`;
