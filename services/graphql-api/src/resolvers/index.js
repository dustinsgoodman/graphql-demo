import { merge } from 'Utils/ObjectUtils';
import { DateTimeResolver, URLResolver } from 'graphql-scalars';
import { characterResolvers } from './character';
import { locationResolvers } from './location';

export const resolvers = merge(
  {},
  characterResolvers,
  locationResolvers,
  // from graphql-scalars
  {
    DateTime: DateTimeResolver,
    URL: URLResolver,
  }
);
