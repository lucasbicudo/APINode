import express from "express";
const app = express();

const livros = [
  { id: 1, titulo: "teste" },
  { id: 2, titulo: "texte" },
];

app.get("/", (req, res) => res.send("Curso de Node"));
app.get("/books", (req, res) => {
  res.status(200).send(livros);
});

export default app;
