import express from 'express';
import loader from './src/loaders/index.js';

const app = express();

loader(app);

app.listen('3000', err => {
  if (err) {
    console.log(err);
    return process.exit(1);
  }
  console.log(`Server is running on 3000`);
});

export default app
