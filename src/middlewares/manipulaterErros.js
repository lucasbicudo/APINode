import mongoose from 'mongoose';
import ErrorBase from '../errors/ErrorBase.js';
import ErrorNotFound from '../errors/ErrorNotFound.js';
import ErrorRequest from '../errors/ErrorRequest.js';
import ErrorValidation from '../errors/ErrorValidation.js';

// eslint-disable-next-line no-unused-vars
function manipulaterErro(err, req, res, next) {
  if (err instanceof mongoose.Error.CastError) {
    new ErrorRequest().sendRes(res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    new ErrorValidation(err).sendRes(res);
  } else if (err instanceof ErrorNotFound) {
    err.sendRes(res);
  } else {
    new ErrorBase().sendRes(res);
  }
}

export default manipulaterErro;
