import books from '../models/Livro.js';

class BookController {
  static listBooks = async (req, res) => {
    const booksResult = await books.find();
    res.status(200).json(booksResult);
  };
}

export default BookController;
