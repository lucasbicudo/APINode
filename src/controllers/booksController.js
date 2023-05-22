import ErrorNotFound from '../errors/ErrorNotFound.js';
import ErrorRequest from '../errors/ErrorRequest.js';
import { authors, books, editor } from '../models/index.js';

class BookController {
  static listBooks = async (req, res, next) => {
    try {
      let { limit = 5, page = 1 } = req.query;

      limit = parseInt(limit);
      page = parseInt(page);

      if (limit > 0 && page > 0) {
        const book = await books
          .find()
          .skip((page - 1) * limit)
          .limit(limit)
          .populate('author')
          .populate('editor');
        res.status(200).json(book);
      } else {
        next(new ErrorRequest());
      }
    } catch (err) {
      next(err);
    }
  };

  static listBookById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const book = await books
        .findById(id)
        .populate('author')
        .populate('editor');
      if (!book) {
        console.log(book);
        next(new ErrorNotFound('ID do livro não encontrado'));
      } else {
        return res.status(200).send(book);
      }
    } catch (err) {
      next(err);
    }
  };

  static createBooks = async (req, res, next) => {
    try {
      const book = new books(req.body);
      await book.save();
      return res.status(201).send(book.toJSON());
    } catch (err) {
      next(err);
    }
  };

  static updateBooks = async (req, res, next) => {
    try {
      const id = req.params.id;
      const dataBook = req.body;
      //.findByIdAndUpdate(id, { $set: req.body }) You can use this way
      const returnUpdate = await books.findByIdAndUpdate(id, dataBook);
      if (returnUpdate !== null) {
        return res.status(200).send(`Livro ${id} atualizado com sucesso!`);
      } else {
        next(
          new ErrorNotFound(
            'ID do livro não encontrado - Verifique o ID, da URL'
          )
        );
      }
    } catch (err) {
      next(err);
    }
  };

  static deleteBook = async (req, res, next) => {
    try {
      const id = req.params.id;
      const returnDelete = await books.findByIdAndDelete(id);
      if (returnDelete !== null) {
        return res.status(200).send(`Livro ${id} deletado com sucesso`);
      } else {
        next(
          new ErrorNotFound(
            'ID do livro não encontrado - Verifique o ID, da URL'
          )
        );
      }
    } catch (err) {
      next(err);
    }
  };

  static listBookByPublisher = async (req, res, next) => {
    try {
      const search = await processSearch(req.query);
      if (search !== null) {
        const returnList = await books
          .find(search)
          .populate('author')
          .populate('editor');
        res.status(200).send(returnList);
      } else {
        res.status(200).send([]);
      }
    } catch (err) {
      next(err);
    }
  };

  static listBookByPublisherId = async (req, res, next) => {
    try {
      const editor = req.params.id;
      const returnList = await books
        .find({ editor: { _id: editor } })
        .populate('author')
        .populate('editor');
      if (Object.keys(returnList).length !== 0) {
        res.status(200).send(returnList);
      } else {
        next(new ErrorNotFound('ID do Editor não encontrado'));
      }
    } catch (err) {
      next(err);
    }
  };
}

async function processSearch(params) {
  const { title, pagesMin, pagesMax, nameAuthor, nameEditor } = params;
  let search = {};
  // filtro pelo titulo do livro
  if (title) search.title = { $regex: title, $options: 'i' };
  if (pagesMin || pagesMax) search.nPages = {};
  // gte = Greater Than Or equal
  if (pagesMin) search.nPages.$gte = pagesMin;
  // lte = Less Than Or equal
  if (pagesMax) search.nPages.$lte = pagesMax;
  //filtro pelo nome do author
  if (nameAuthor) {
    const author = await authors.findOne({ name: nameAuthor });
    if (author !== null) {
      search.author = author._id;
    } else {
      search = null;
    }
  }
  //filtro pelo nome do editor
  if (nameEditor !== null) {
    const returnEditor = await editor.findOne({ name: nameEditor });
    if (returnEditor !== null) {
      search.editor = returnEditor._id;
    } else {
      search = null;
    }
  }
  return search;
}

export default BookController;
