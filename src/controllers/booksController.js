import ErrorNotFound from '../errors/ErrorNotFound.js';
import books from '../models/Book.js';

class BookController {
  static listBooks = async (req, res, next) => {
    try {
      const book = await books.find().populate('author').populate('editor');
      res.status(200).json(book);
    } catch (err) {
      next(err);
    }
  };

  static listBookById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const book = await books.findById(id);
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

  static listBookByPublisher = async (req, res) => {
    try {
      const publisher = req.query.publisher;
      const returnList = await books
        .find({ editor: publisher })
        .populate('author');
      res.status(200).send(returnList);
    } catch (err) {
      res.send(err);
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

export default BookController;
