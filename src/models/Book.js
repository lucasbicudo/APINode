import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String, required: true },
  author: { type: String, required: true },
  editor: { type: String, required: true },
  nPages: { type: Number },
});

const books = mongoose.model('books', bookSchema);

export default books;
