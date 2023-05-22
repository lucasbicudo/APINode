import ErrorRequest from '../errors/ErrorRequest.js';

async function page(req, res, next) {
  let { limit = 5, page = 1, ordination = '_id:-1' } = req.query;

  let [paramOrder, order] = ordination.split(':');

  limit = parseInt(limit);
  page = parseInt(page);

  const result = req.result;

  if (limit > 0 && page > 0) {
    const resultPage = await result
      .find()
      .sort({ [paramOrder]: order })
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json(resultPage);
  } else {
    next(new ErrorRequest());
  }
}

export default page;
