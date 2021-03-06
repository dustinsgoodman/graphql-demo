import { Lambda } from 'API/AWSApi';
import { downcaseKeys } from 'Utils/ObjectUtils';

const PORTS = {
  'graphql-api': 3002,
  'character-api': 3006,
  'location-api': 3010,
};

/**
 *
 * @param {String} serviceName - The name of the Service the function you wish to invoke belongs to, e.g. User-API
 * @param {String} functionName - The name of the Lambda function, version or alias - excluding the service name and stage. See: https://docs.aws.amazon.com/lambda/latest/dg/API_Invoke.html#API_Invoke_RequestSyntax
 * @param {Object} payload - The data to be provided to the Lambda as an input - will be JSON.stringified before being passed to Lambda
 * @param {Base64} context=null - The context object to be passed from Apollo Resolver
 * @param {String} [invocationType='RequestResponse'] - The type of invocation to carry out. See: https://docs.aws.amazon.com/lambda/latest/dg/API_Invoke.html#API_Invoke_RequestSyntax
 * @returns {Object} payload - The JSON data that is returned from the Lambda invocation
 */
export const invoke = async ({
  serviceName,
  functionName,
  payload,
  context = {},
  invocationType = 'RequestResponse',
}) => {
  const combinedPayload = {
    ...context.event,
    body: JSON.stringify(payload),
  };

  // forcing all headers for case insensitivity
  if (combinedPayload.headers) {
    combinedPayload.headers = downcaseKeys(combinedPayload.headers);
  }

  const combinedContext = {
    ...context.context,
    userId: context.userId,
  };

  const stringifiedContext = JSON.stringify(combinedContext);
  const processedContext = Buffer.from(stringifiedContext).toString('base64');
  const params = {
    ClientContext: processedContext,
    FunctionName: `${serviceName}-${process.env.SLS_STAGE}-${functionName}`,
    InvocationType: invocationType,
    Payload: JSON.stringify(combinedPayload),
    LogType: 'Tail',
  };

  const invokeUrl =
    process.env.IS_OFFLINE === 'true'
      ? `http://localhost:${PORTS[serviceName]}`
      : `https://lambda.${process.env.REGION}.amazonaws.com`;

  const lambda = new Lambda({
    apiVersion: '2031',
    region: process.env.REGION,
    endpoint: invokeUrl,
  });

  const { Payload } = await lambda.invoke(params).promise();
  return JSON.parse(Payload);
};
