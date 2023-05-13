import ErrorBase from './ErrorBase.js';

class ErrorNotFound extends ErrorBase {
  constructor(message = 'Pagina não encontrada') {
    super(message, 404);
  }
}

export default ErrorNotFound;
