import { Request, Response } from 'express';

export default function processWebhookData(req: Request, res: Response) {
  // body: Record<string, unknown>
  res.json(req.body)
}
