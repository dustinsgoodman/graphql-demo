import { merge } from 'Utils/ObjectUtils';
import { DateTimeResolver, URLResolver } from 'graphql-scalars';
import { characterResolvers } from './character';

export const resolvers = merge(
  {},
  characterResolvers,
  // from graphql-scalars
  {
    DateTime: DateTimeResolver,
    URL: URLResolver,
  }
);
