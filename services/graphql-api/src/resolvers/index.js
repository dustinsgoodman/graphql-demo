import { merge } from 'Utils/ObjectUtils';
import { characterResolvers } from './character';

export const resolvers = merge({}, characterResolvers);
