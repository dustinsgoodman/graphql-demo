import { findAll, countAll } from 'Models/LocationModel';
import { internalErrorResponse, okResponse } from 'Utils/ResponseCodeUtils';

export const main = async (event) => {
  const { pagination = { page: 1, perPage: 10 } } = JSON.parse(event.body);

  try {
    const { page, perPage } = pagination;
    const [locations, locationsCount] = await Promise.all([findAll({ pagination }), countAll()]);

    return okResponse({
      nodes: locations,
      pageInfo: {
        page,
        perPage,
        total: locationsCount,
        totalPages: Math.ceil(locationsCount / perPage),
      },
    });
  } catch (err) {
    return internalErrorResponse(err.message);
  }
};
