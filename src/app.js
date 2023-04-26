import express from "express";
const app = express();

const books = [
  { id: 1, title: "Em busca de Sentido" },
  { id: 2, title: "A arte da guerra" },
  { id: 3, title: "Começe pelo porque" },
];

app.get("/", (req, res) => res.send("I'm Learning Node.js"));
app.get("/books", (req, res) => {
  res.status(200).send(books);
});

export default app;
