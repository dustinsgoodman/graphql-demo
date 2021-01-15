import { GraphQLScalarType, Kind } from 'graphql';

export const formatDateTime = (value, format = null) => {
  if (!value) return null;

  const dt = new Date(value);
  switch (format) {
    case 'DATETIME':
      return dt;
    case 'MILLISECONDS':
      return dt.getTime();
    case 'SECONDS':
    default:
      return parseInt(dt.getTime() / 1000, 10);
  }
};

export const datetimeResolvers = {
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description:
      'A date-time representation. If a number is provided, the unix timestamp in seconds or milliseconds will be returned. If a DateTime or String is provided, the ISO 8601 standard will be returned.',
    serialize(value) {
      if (value === null || value === undefined) {
        return null;
      }

      if (typeof value === 'number' || value instanceof Date) {
        return value;
      }

      if (typeof value === 'string') {
        return new Date(value);
      }

      throw new TypeError(
        `DateTime cannot be serialized from non string, non numeric, or non Date type ${value}`
      );
    },
    parseValue(value) {
      if (value === null || value === undefined) {
        return null;
      }

      if (value === 'number' || value instanceof Date) {
        return value;
      }

      if (typeof value === 'string') {
        return new Date(value);
      }

      throw new TypeError(
        `DateTime cannot be serialized from non string, non numeric, or non Date type ${value}`
      );
    },
    parseLiteral(ast) {
      if (Kind.NULL) {
        return null;
      }

      if (ast.kind === Kind.INT) {
        return ast.value;
      }

      if ([Kind.STRING, Kind.DateTime].includes(ast.kind)) {
        return new Date(ast.value);
      }

      throw new TypeError(
        `DateTime cannot be serialized from non string, non numeric, or non Date type ${ast.value}`
      );
    },
  }),
};
