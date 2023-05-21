import ErrorNotFound from '../errors/ErrorNotFound.js';
import { editor } from '../models/index.js';

class EditorController {
  static listEditor = async (req, res, next) => {
    try {
      const editorResult = await editor.find();
      return res.status(200).json(editorResult);
    } catch (err) {
      next(err);
    }
  };

  static listEditorById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const returnEditor = await editor.findById(id);

      if (!returnEditor) {
        next(new ErrorNotFound('ID do editor não encontrado'));
      } else {
        return res.status(200).send(returnEditor);
      }
    } catch (err) {
      next(err);
    }
  };
  // id editor 645d7b34f0d0ee9c88fbfdca
  static createEditor = async (req, res, next) => {
    try {
      const publisher = new editor(req.body);
      await publisher.save();
      return res.status(201).send(publisher.toJSON());
    } catch (err) {
      next(err);
    }
  };

  static updateEditor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const dataEditor = req.body;
      //.findByIdAndUpdate(id, { $set: req.body }) You can use this way
      await editor.findByIdAndUpdate(id, dataEditor);
      return res.status(200).send(`Livro ${id} atualizado com sucesso!`);
    } catch (err) {
      next(err);
    }
  };

  static deleteEditor = async (req, res, next) => {
    try {
      const id = req.params.id;
      await editor.findByIdAndDelete(id);
      return res.status(200).send(`Livro ${id} deletado com sucesso`);
    } catch (err) {
      next(err);
    }
  };
}

export default EditorController;
