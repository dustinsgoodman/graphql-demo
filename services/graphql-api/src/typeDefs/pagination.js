import { gql } from 'apollo-server-lambda';

export const paginationTypeDef = gql`
  """
  Enum of sorting directions
  """
  enum SortDirection {
    "Ascending"
    ASC
    "Descending"
    DESC
  }

  """
  Pagination input object for selecting a page
  """
  input PaginationInput {
    "Page to return"
    page: Int
    "Items to return per page"
    perPage: Int
    "Sorting direction to return objects"
    sortDirection: SortDirection
  }

  """
  PageInfo object for describing the pagination info on response
  """
  type PageInfo {
    "What page was returned"
    page: Int
    "Number of items returned for the page"
    perPage: Int
    "Total number of items"
    total: Int
    "Total number of pages"
    totalPages: Int
  }
`;
