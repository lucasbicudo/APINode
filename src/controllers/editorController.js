import editor from '../models/Publisher.js';

class EditorController {
  static listEditor = async (req, res) => {
    const editorResult = await editor.find();
    return res.status(200).json(editorResult);
  };

  static listEditorById = async (req, res) => {
    const id = req.params.id;
    await editor
      .findById(id)
      .then((editor) => {
        if (!editor) {
          return res.status(404).send('ID não encontrado');
        }
        return res.status(200).send(editor);
      })
      .catch((err) => {
        return res.status(500).send({
          message: `${err.message} => Houve algum erro verifique o ID digitado`,
        });
      });
  };
  // id editor 645d7b34f0d0ee9c88fbfdca
  static createEditor = async (req, res) => {
    const publisher = new editor(req.body);
    await publisher
      .save()
      .then(() => {
        return res.status(201).send(publisher.toJSON());
      })
      .catch((err) => {
        return res
          .status(500)
          .send({ message: `${err.message} - dado obrigatório` });
      });
  };

  static updateEditor = async (req, res) => {
    const id = req.params.id;
    const dataEditor = req.body;
    await editor
      //.findByIdAndUpdate(id, { $set: req.body }) You can use this way
      .findByIdAndUpdate(id, dataEditor)
      .then(() => {
        return res.status(200).send(`Livro ${id} atualizado com sucesso!`);
      })
      .catch((err) => {
        return res
          .status(500)
          .send({ message: `${err.message} - Livro não foi atualizado` });
      });
  };

  static deleteEditor = async (req, res) => {
    const id = req.params.id;
    await editor
      .findByIdAndDelete(id)
      .then(() => {
        return res.status(200).send(`Livro ${id} deletado com sucesso`);
      })
      .catch((err) => {
        return res.status(500).send({ message: `${err.message} => Deu erro` });
      });
  };
}

export default EditorController;
