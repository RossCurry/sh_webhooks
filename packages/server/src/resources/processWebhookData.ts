import { Request, Response } from 'express';
import {io as socket} from '../main.js'

export default function processWebhookData(req: Request, res: Response) {
  const { body, url, baseUrl, cookies, hostname, httpVersion, ip, ips, method, protocol, params, path, query, route, headers } = req
  const requestInfo = {
    hostname, httpVersion, ip, ips, method, route
  }
  const urlInfo = {
    url, baseUrl, protocol, params, path, query
  }
  socket.emit('webhookEvent', {requestInfo, urlInfo, headers, body})
  res.end().status(200)
}
