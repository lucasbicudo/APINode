import ErrorRequest from './ErrorRequest.js';

class ErrorValidation extends ErrorRequest {
  constructor(err) {
    const messageErr = Object.values(err.errors)
      .map((err) => err.message)
      .join('; ');
    super(`Os seguintes erros foram encontrados: ${messageErr}`);
  }
}

export default ErrorValidation;
