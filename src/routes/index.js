import express from 'express';
import books from './booksRoutes.js';
import authors from './authorsRoutes.js';
import editor from './editorRoutes.js';

const routes = (app) => {
  app
    .route('/')
    .get((req, res) =>
      res.status(200).send({ titulo: "I'm Learning Node.js" })
    );

  app.use(express.json(), books, authors, editor);
};

export default routes;
