import express from "express";
const app = express();
app.use(express.json());

const books = [
  { id: 1, title: "Em busca de Sentido" },
  { id: 2, title: "A arte da guerra" },
  { id: 3, title: "Começe pelo porque" },
];

// CRUD Routes
app.get("/", (req, res) => res.send("I'm Learning Node.js"));
app.get("/books", (req, res) => {
  res.status(200).send(books);
});

app.put("/books/:id", (req, res) => {
  let find = findBook(req.params.id);
  res.status(200).json(books[find]);
});

app.post("/books", (req, res) => {
  books.push(req.body);
  res.status(200).send("Book created with sucessful!");
});

app.put("/books/:id", (req, res) => {
  let find = findBook(req.params.id);
  books[find] = req.body;
  res.status(200).send("Updated was sucessful");
});

function findBook(id) {
  return books.findIndex((book) => book.id == id);
}
//cre

export default app;
