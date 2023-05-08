import books from '../models/Book.js';

class BookController {
  static listBooks = async (req, res) => {
    const booksResult = await books.find();
    return res.status(200).json(booksResult);
  };

  static listBookById = async (req, res) => {
    const id = req.params.id;
    await books
      .findById(id)
      .then((book) => {
        if (!book) {
          return res.status(404).send('ID não encontrado');
        }
        return res.status(200).send(book);
      })
      .catch((err) => {
        return res.status(500).send({
          message: `${err.message} => Houve algum erro verifique o ID digitado`,
        });
      });
  };

  static createBooks = async (req, res) => {
    const book = new books(req.body);
    await book
      .save()
      .then(() => {
        return res.status(201).send(book.toJSON());
      })
      .catch((err) => {
        return res
          .status(500)
          .send({ message: `${err.message} - dado obrigatório` });
      });
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
}

export default BookController;
