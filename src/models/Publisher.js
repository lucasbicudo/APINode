import mongoose from 'mongoose';

const publisherSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String, required: true },
    adress: { type: String, required: true },
  },
  { versionKey: false }
);

const editor = mongoose.model('editor', publisherSchema);

export default editor;
