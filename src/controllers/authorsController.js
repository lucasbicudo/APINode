import ErrorNotFound from '../errors/ErrorNotFound.js';
import authors from '../models/Author.js';

class AuthorController {
  static listAuthors = async (req, res, next) => {
    try {
      const authorsResult = await authors.find();
      return res.status(200).json(authorsResult);
    } catch (err) {
      next(err);
    }
  };

  static listAuthorById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const returnAuthor = await authors.findById(id);
      if (!returnAuthor) {
        next(new ErrorNotFound('ID do Author não encontrado'));
      } else {
        return res.status(200).send(returnAuthor);
      }
    } catch (err) {
      next(err);
    }
  };

  static createAuthors = async (req, res, next) => {
    try {
      const author = new authors(req.body);
      await author.save();
      return res.status(201).send(author.toJSON());
    } catch (err) {
      next(err);
    }
  };

  static updateAuthors = async (req, res, next) => {
    try {
      const id = req.params.id;
      const dataAuthor = req.body;
      //.findByIdAndUpdate(id, { $set: req.body }) You can use this way
      await authors.findByIdAndUpdate(id, dataAuthor);
      return res.status(200).send(`Livro ${id} atualizado com sucesso!`);
    } catch (err) {
      next(err);
    }
  };

  static deleteAuthor = async (req, res, next) => {
    try {
      const id = req.params.id;
      await authors.findByIdAndDelete(id);
      return res.status(200).send(`Livro ${id} deletado com sucesso`);
    } catch (err) {
      next(err);
    }
  };
}

export default AuthorController;
