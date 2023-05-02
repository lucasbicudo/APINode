import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://lucasbicudo:090607@projects.hzyvtii.mongodb.net/alura-biblioteca-API"
);

let db = mongoose.connection;

export default db;
