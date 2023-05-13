import ErrorBase from './ErrorBase.js';

class ErrorRequest extends ErrorBase {
  constructor(message = 'Um ou mais dados fornecidos estão incorretos') {
    super(message, 400);
  }
}

export default ErrorRequest;
