import { findAll, countAll } from 'Models/CharacterModel';
import { internalErrorResponse, okResponse } from 'Utils/ResponseCodeUtils';

export const main = async (event) => {
  const { pagination = { page: 1, perPage: 10 } } = JSON.parse(event.body);

  try {
    const { page, perPage } = pagination;
    const [characters, charactersCount] = await Promise.all([findAll({ pagination }), countAll()]);

    return okResponse({
      nodes: characters,
      pageInfo: {
        page,
        perPage,
        total: charactersCount,
        totalPages: Math.ceil(charactersCount / perPage),
      },
    });
  } catch (err) {
    return internalErrorResponse(err.message);
  }
};
