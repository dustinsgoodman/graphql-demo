import { UserInputError, ApolloError } from 'apollo-server-lambda';
import { invoke } from 'Utils/LambdaUtils';

export const characters = async (parent, args, context) => {
  const { code, message, statusCode } = await invoke({
    serviceName: 'character-api',
    functionName: 'getCharacters',
    payload: {},
    context,
  });

  if (statusCode === 400) {
    throw new UserInputError(message);
  } else if (statusCode > 400) {
    throw new ApolloError(message, code);
  }

  return message;
};
