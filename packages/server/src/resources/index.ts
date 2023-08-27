import express from 'express';
import bodyParser from 'body-parser'
import verify from './verifySignature.js'
import processWebhookData from './processWebhookData.js';
import { getConfig, getSecret, setSecret, setValidation } from './config.js';
export const router = express.Router();

router.use(bodyParser.json())

router.get('/secret', getSecret);
// secret
router.post('/secret', setSecret);
// config
router.get('/config', getConfig);
// validation
router.post('/validation', setValidation);

// webhooks
router.get('/webhook', processWebhookData);
router.patch('/webhook', processWebhookData);
router.delete('/webhook', processWebhookData);
router.post('/webhook', verify, processWebhookData);
