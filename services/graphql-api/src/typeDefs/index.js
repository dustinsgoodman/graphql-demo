import { gql } from 'apollo-server-lambda';
import { URLTypeDefinition } from 'graphql-scalars';

import { characterTypeDef } from './character';
import { datetimeTypeDef } from './datetime';
import { locationTypeDef } from './location';
import { paginationTypeDef } from './pagination';

const baseTypeDefs = gql`
  """
  Collections of queries for schema
  """
  type Query {
    "Empty query type to serve as a parent for all other queries"
    _: String
  }

  """
  Collections of mutations for schema
  """
  type Mutation {
    "Empty mutation type to serve as a parent for all other mutations"
    _: String
  }

  """
  Collections of subscriptions for schema
  """
  type Subscription {
    "Empty subscription type to serve as a parent for all other subscriptions"
    _: String
  }
`;

export const typeDefs = [
  baseTypeDefs,
  characterTypeDef,
  datetimeTypeDef,
  locationTypeDef,
  paginationTypeDef,
  // from graphql-scalars
  URLTypeDefinition,
];
