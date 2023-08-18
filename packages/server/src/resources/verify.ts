
import { NextFunction, Request, Response } from 'express';
import moment from 'moment'
import crypto from 'node:crypto'
import { config } from '../utils/staticConfig.js';

class InvalidSignature extends Error {}

export default function verifySignature (req: Request, res: Response, next: NextFunction) {
  
  const {
    'x-socialhub-timestamp': reqTimestamp,
    'x-socialhub-signature': reqSignature,
  } = req.headers;

  if (!reqTimestamp || !reqSignature) {
    throw new InvalidSignature('SocialHub headers missing from request');
  }

  // Prevent replay attacks by ensuring this request has been signed
  // recently (+/- 5 minutes). The request timestamp is in ms!
  if (moment().diff(Number(reqTimestamp), 'minutes', true) > 5) {
    throw new InvalidSignature('Request timestamp is not valid');
  }

  // Calculate challenge hash.
  const challenge = crypto.createHash('sha256').update(`${reqTimestamp};${config.socialHub.manifestSecret}`).digest('hex');
  const hmac = crypto.createHmac('sha256', challenge);

  // Add payload to calculations
  // Middleware is used after body was parsed -> req.body will be set.
  if (req.body) {
    const payload = JSON.stringify(req.body);
    hmac.update(payload);
  }

  // Calculate signature
  const expectedSignature = hmac.digest('hex');

  // Compare expected with received signature.
  if (reqSignature !== expectedSignature) {
    throw new InvalidSignature('Request signature is not valid');
  }

  // Add solved challenge to response.
  // This will proof to SocialHub that we were the intended recipient.
  res.set('x-socialhub-challenge', challenge);
  
  next();
};
