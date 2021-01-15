import { characters } from './characters';
import { character } from './character';

export const characterResolvers = {
  Query: {
    characters,
    character,
  },
};
