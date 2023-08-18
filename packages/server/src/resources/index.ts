import express from 'express';
import { Request, Response } from 'express';
import bodyParser from 'body-parser'
import verify from './verify.js'
import processWebhookData from './processWebhookData.js';
export const router = express.Router();
import { config } from '../utils/staticConfig.js';

router.use(bodyParser.json())

router.get('/secret', (_req, res) => {
  res.json({ secret: config.socialHub.manifestSecret });
});

router.post('/secret',
// bodyParser.json(),
setSecret,
);

router.post('/webhook',
  // bodyParser.json(),
  verify,
  processWebhookData
);

function setSecret(req: Request, res: Response) {
  console.log('called  setSecret', req.body )
  const newSecret = req.body.secret
  config.socialHub.manifestSecret = newSecret
  console.log('config.socialHub.manifestSecret ', config.socialHub.manifestSecret )
  res.json({ updatedSecret: config.socialHub.manifestSecret }).status(200)
}