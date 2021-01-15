import { characters } from './characters';
import { character } from './character';
import { location } from '../location/location';
import { formatDateTime } from '../datetime';

export const characterResolvers = {
  Query: {
    characters,
    character,
  },
  Character: {
    createdAt: async ({ createdAt }, { format }) => formatDateTime(createdAt, format),
    currentLocation: async ({ locationId }, args, context) =>
      location({}, { id: locationId }, context),
    origin: async ({ originId }, args, context) => location({}, { id: originId }, context),
    updatedAt: async ({ updatedAt }, { format }) => formatDateTime(updatedAt, format),
  },
};
