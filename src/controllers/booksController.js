import books from '../models/Livro.js';

class BookController {
  static listBooks = async (req, res) => {
    const booksResult = await books.find();
    res.status(200).json(booksResult);
  };

  static createBooks = async (req, res) => {
    const book = new books(req.body);
    await book
      .save()
      .then(() => {
        res.status(201).send(book.toJSON());
      })
      .catch((err) => {
        res.status(500).send({ message: `${err.message} - dado obrigatório` });
      });
  };

  static updateBooks = async (req, res) => {
    const id = req.params.id;
    const dataBook = req.body;
    await books
      //.findByIdAndUpdate(id, { $set: req.body }) You can use this way
      .findByIdAndUpdate(id, dataBook)
      .then(() => {
        res.status(201).send(`Livro ${id} atualizado com sucesso!`);
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: `${err.message} - Livro não foi atualizado` });
      });
  };
}

export default BookController;
