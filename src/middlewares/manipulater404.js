import ErrorNotFound from '../errors/ErrorNotFound.js';

function manipulater404(req, res, next) {
  const error404 = new ErrorNotFound();
  next(error404);
}

export default manipulater404;
