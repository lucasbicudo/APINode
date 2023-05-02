import mongoose from 'mongoose';

mongoose.connect(
    'mongodb+srv://lucasbicudo:cPT5YulEDOq7eO0i@projects.hzyvtii.mongodb.net/alura-biblioteca-API'
);

let db = mongoose.connection;

export default db;
