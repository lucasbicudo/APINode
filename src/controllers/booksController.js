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
        return res.status(404).send({ message: 'ID não encontrado' });
      } else {
        return res.status(200).send(book);
      }
    } catch (err) {
      next(err);
    }
  };

  static createBooks = async (req, res) => {
    try {
      const book = new books(req.body);
      await book.save();
      return res.status(201).send(book.toJSON());
    } catch (err) {
      return res
        .status(500)
        .send({ message: `${err.message} - dado obrigatório` });
    }
  };

  static updateBooks = async (req, res) => {
    const id = req.params.id;
    const dataBook = req.body;
    await books
      //.findByIdAndUpdate(id, { $set: req.body }) You can use this way
      .findByIdAndUpdate(id, dataBook)
      .then(() => {
        return res.status(200).send(`Livro ${id} atualizado com sucesso!`);
      })
      .catch((err) => {
        return res
          .status(500)
          .send({ message: `${err.message} - Livro não foi atualizado` });
      });
  };

  static deleteBook = async (req, res) => {
    const id = req.params.id;
    await books
      .findByIdAndDelete(id)
      .then(() => {
        return res.status(200).send(`Livro ${id} deletado com sucesso`);
      })
      .catch((err) => {
        return res.status(500).send({ message: `${err.message} => Deu erro` });
      });
  };

  static listBookByPublisher = async (req, res) => {
    const publisher = req.query.publisher;
    await books
      .find({ editor: publisher })
      .populate('author')
      .then((returna) => {
        res.status(200).send(returna);
      })
      .catch((err) => {
        res.send(err);
      });
  };

  static listBookByPublisherId = async (req, res) => {
    const editor = req.params.id;
    await books
      .find({ editor: { _id: editor } })
      .populate('author')
      .populate('editor')
      .then((returna) => {
        res.status(200).send(returna);
      })
      .catch(() => {
        res.status(404).send({
          messageErr: `id => ${editor} não foi encontrado, Digite um id correto`,
        });
      });
  };
}

export default BookController;
