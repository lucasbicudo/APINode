import express from 'express';
import db from './config/config.js';
import routes from './routes/index.js';
import manipulaterErro from './middlewares/manipulaterErros.js';
import manipulater404 from './middlewares/manipulater404.js';

db.on('error', console.log.bind(console, 'Connection Error'));
db.once('open', () => {
  console.log('Connection Successful');
});

const app = express();
app.use(express.json());
routes(app);

app.use(manipulater404);
app.use(manipulaterErro);

export default app;
