import mongoose from 'mongoose';
// eslint-disable-next-line no-unused-vars
function manipulaterErro(err, req, res, next) {
  if (err instanceof mongoose.Error.CastError) {
    return res
      .status(400)
      .send({ message: 'Um ou mais dados fornecidos estão incorretos' });
  } else {
    return res.status(500).send({
      message: 'Erro interno de servidor',
    });
  }
}

export default manipulaterErro;
