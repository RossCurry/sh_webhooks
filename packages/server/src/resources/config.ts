import { Request, Response } from 'express';
import { config } from '../utils/staticConfig.js';

type ResponseConfig = {
  config: {
    useValidation: boolean,
    secret: string
  }
}
export function getConfig(_req: Request, res: Response) {
  res.json({ config: { useValidation: config.useValidation, secret: config.socialHub.manifestSecret } });
}
// TODO remove
export function getSecret(_req: Request, res: Response) {
  res.json({ secret: config.socialHub.manifestSecret });
}

export function setSecret(req: Request, res: Response) {
  const newSecret = req.body.secret
  config.socialHub.manifestSecret = newSecret
  res.json({ updatedSecret: config.socialHub.manifestSecret }).status(200)
}

export function setValidation(req: Request, res: Response) {
  const useValidation = req.body.useValidation
  config.useValidation = req.body.useValidation
  res.json({ updatedValidation: config.useValidation }).status(200)
}