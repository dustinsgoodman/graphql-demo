import { UnknownError } from 'Phrases/ErrorPhrases';

class GenericError extends Error {
  constructor(message = UnknownError, code = 'UNKNOWN', properties = null) {
    super(message);

    this.code = code;
    this.name = 'GenericError';

    if (properties) {
      Object.keys(properties)
        .filter((keyName) => keyName !== 'message' && keyName !== 'properties')
        .forEach((key) => {
          this[key] = properties[key];
        });
    }
  }
}

export default GenericError;
