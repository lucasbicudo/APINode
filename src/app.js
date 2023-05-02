import express from 'express';
import db from './config/config.js';
import books from './models/Livro.js';

db.on('error', console.log.bind(console, 'Connection Error'));
db.once('open', () => {
  console.log('Connection Successful');
});

const app = express();
app.use(express.json());

// CRUD Routes
app.get('/', (req, res) => res.send("I'm Learning Node.js"));

app.get('/books', async (req, res) => {
  try {
    const booksResult = await books.find();
    res.status(200).json(booksResult);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get('/books/:id', (req, res) => {
  let found = findBook(req.params.id);
  res.status(200).json(books[found]);
});

app.post('/books', (req, res) => {
  books.push(req.body);
  res.status(200).send('Book created with sucessful!');
});

app.put('/books/:id', (req, res) => {
  let found = findBook(req.params.id);
  books[found] = req.body;
  res.status(200).send('Updated was sucessful');
});

app.delete('/books/:id', (req, res) => {
  let { id } = req.params;
  let found = findBook(id);
  books.splice(found, 1);
  res.send(`Book ${id} removed with sucess`);
});

function findBook(id) {
  return books.findIndex((book) => book.id == id);
}

export default app;
