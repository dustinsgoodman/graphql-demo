import GenericError from './GenericError';

class ValidationError extends GenericError {
  constructor(message, properties = {}) {
    super(message, 'VALIDATION_ERROR', properties);
    this.name = 'ValidationError';
  }
}

export default ValidationError;
