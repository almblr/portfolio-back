import express from 'express';
import serverless from 'serverless-http';
import loader from '../src/loaders/index.js';
const app = express();
const router = express.Router();
// loader(app);

router.get('/', (req, res) => {
  res.status(200).json({ success: 'it works' })
})

app.use('/.netlify/functions/api/v1', router)
export const handler = serverless(app);