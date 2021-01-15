import { UserInputError, ApolloError } from 'apollo-server-lambda';
import { invoke } from 'Utils/LambdaUtils';

export const character = async (parent, { id }, context) => {
  const { code, message, statusCode } = await invoke({
    serviceName: 'character-api',
    functionName: 'character',
    payload: {
      characterId: id,
    },
    context,
  });

  if (statusCode === 400) {
    throw new UserInputError(message);
  } else if (statusCode > 400) {
    throw new ApolloError(message, code);
  }

  return message;
};
