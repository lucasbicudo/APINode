import express from 'express';
import db from './config/config.js';
import books from './models/Book.js';
import routes from './routes/index.js';

db.on('error', console.log.bind(console, 'Connection Error'));
db.once('open', () => {
  console.log('Connection Successful');
});

const app = express();
app.use(express.json());
routes(app);

export default app;
