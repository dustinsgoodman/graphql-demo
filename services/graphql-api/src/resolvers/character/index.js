import { characters } from './characters';
import { character } from './character';
import { location } from '../location/location';

export const characterResolvers = {
  Query: {
    characters,
    character,
  },
  Character: {
    currentLocation: async ({ locationId }, args, context) =>
      location({}, { id: locationId }, context),
    origin: async ({ originId }, args, context) => location({}, { id: originId }, context),
  },
};
