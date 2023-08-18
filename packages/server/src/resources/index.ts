import express from 'express';
import bodyParser from 'body-parser'
import verify from './verify.js'
import processWebhookData from './processWebhookData.js';
export const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

router.post('/webhook',
  bodyParser.json(),
  // verify,
  processWebhookData
);

