import { gql } from 'apollo-server-lambda';

export const locationTypeDef = gql`
  """
  Defines Location type
  """
  type Location {
    "Created at date time in ISO format"
    createdAt(format: DateTimeDisplayFormat = DATETIME): DateTime!
    "What dimension is this location within"
    dimension: String!
    "Unique identifier"
    id: ID!
    "Human readable name"
    name: String!
    "Classification of location"
    type: String!
    "Updated at date time in ISO format"
    updatedAt(format: DateTimeDisplayFormat = DATETIME): DateTime!
  }
  """
  Location repsonse object for pagination
  """
  type LocationConnection {
    "List of locations"
    nodes: [Location]
    "Pagination information"
    pageInfo: PageInfo
  }
  extend type Query {
    "Returns a list of all the locations"
    locations(pagination: PaginationInput): LocationConnection
    "Returns a location given its ID"
    location(id: ID!): Location
  }
`;
