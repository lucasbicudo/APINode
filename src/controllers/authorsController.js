import authors from '../models/Author.js';

class AuthorController {
  static listAuthors = async (req, res) => {
    const authorsResult = await authors.find();
    return res.status(200).json(authorsResult);
  };

  static listAuthorById = async (req, res) => {
    const id = req.params.id;
    await authors
      .findById(id)
      .then((author) => {
        if (!author) {
          return res.status(404).send('ID não encontrado');
        }
        return res.status(200).send(author);
      })
      .catch((err) => {
        return res.status(500).send({
          message: `${err.message} => Houve algum erro verifique o ID digitado`,
        });
      });
  };

  static createAuthors = async (req, res) => {
    const author = new authors(req.body);
    await author
      .save()
      .then(() => {
        return res.status(201).send(author.toJSON());
      })
      .catch((err) => {
        return res
          .status(500)
          .send({ message: `${err.message} - dado obrigatório` });
      });
  };

  static updateAuthors = async (req, res) => {
    const id = req.params.id;
    const dataAuthor = req.body;
    await authors
      //.findByIdAndUpdate(id, { $set: req.body }) You can use this way
      .findByIdAndUpdate(id, dataAuthor)
      .then(() => {
        return res.status(200).send(`Livro ${id} atualizado com sucesso!`);
      })
      .catch((err) => {
        return res
          .status(500)
          .send({ message: `${err.message} - Livro não foi atualizado` });
      });
  };

  static deleteAuthor = async (req, res) => {
    const id = req.params.id;
    await authors
      .findByIdAndDelete(id)
      .then(() => {
        return res.status(200).send(`Livro ${id} deletado com sucesso`);
      })
      .catch((err) => {
        return res.status(500).send({ message: `${err.message} => Deu erro` });
      });
  };
}

export default AuthorController;
