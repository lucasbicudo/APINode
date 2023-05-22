import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const bookSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String, required: [true, 'O campo titulo é obrigatório'] },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'authors',
    required: [true, 'O campo autor é obrigatório'],
    autopopulate: true,
  },
  editor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'editor',
    required: [true, 'O campo editora é obrigatório'],
    autopopulate: true,
  },
  nPages: {
    type: Number,
    min: [
      10,
      'O numero de páginas devem estar entre 10 e 5000, Numero digitado {VALUE}',
    ],
    max: [
      5000,
      'O numero de páginas devem estar entre 10 e 5000, Numero digitado {VALUE}',
    ],
  },
});

bookSchema.plugin(autopopulate);

const books = mongoose.model('books', bookSchema);

export default books;
