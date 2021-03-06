import { gql } from 'apollo-server-lambda';

export const datetimeTypeDef = gql`
  scalar DateTime

  """
  Format enum for choosing display for date time values
  """
  enum DateTimeDisplayFormat {
    "Date time as ISO 8601 string"
    DATETIME
    "Milliseconds since epoch"
    MILLISECONDS
    "Seconds since epoch"
    SECONDS
  }
`;
