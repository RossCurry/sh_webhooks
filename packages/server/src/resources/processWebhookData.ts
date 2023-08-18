import { Request, Response } from 'express';
import {io as socket} from './sockets/index.js'

export default function processWebhookData(req: Request, res: Response) {
  // req.headers
  socket.emit('webhookEvent', req.headers)
}
