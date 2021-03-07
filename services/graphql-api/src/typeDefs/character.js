import { gql } from 'apollo-server-lambda';

export const characterTypeDef = gql`
  """
  Defines Character type for API
  """
  type Character {
    "What is their current location?"
    currentLocation: Location
    "Created at date time in ISO format"
    createdAt(format: DateTimeDisplayFormat = DATETIME): DateTime!
    "Gender identity if known"
    gender: Gender
    "Unique identifier"
    id: ID!
    "URL for image asset"
    image: URL!
    "Human readable name"
    name: String!
    "Where are they from originally?"
    origin: Location
    "Species identification"
    species: String!
    "Alive or Dead status if known"
    status: CharacterStatus
    "Description of the character"
    type: String!
    "Updated at date time in ISO format"
    updatedAt(format: DateTimeDisplayFormat = DATETIME): DateTime!
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

  """
  What is the state of this character?
  """
  enum CharacterStatus {
    "Alive"
    ALIVE
    "Dead"
    DEAD
  }
  """
  How does this character identify?
  """
  enum Gender {
    "Non-binary or unknown"
    GENDERLESS
    "Female"
    FEMALE
    "Male"
    MALE
  }

  extend type Query {
    "Returns a list of all the characters"
    characters(pagination: PaginationInput): CharacterConnection
    "Returns a character given its ID"
    character(id: ID!): Character
  }
`;
