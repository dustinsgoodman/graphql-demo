import { merge } from 'Utils/ObjectUtils';
import { URLResolver } from 'graphql-scalars';
import { characterResolvers } from './character';
import { datetimeResolvers } from './datetime';
import { locationResolvers } from './location';

export const resolvers = merge(
  {},
  characterResolvers,
  datetimeResolvers,
  locationResolvers,
  // from graphql-scalars
  {
    URL: URLResolver,
  }
);
