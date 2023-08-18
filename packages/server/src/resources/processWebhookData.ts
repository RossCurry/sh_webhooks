import { Request, Response } from 'express';
import {io as socket} from './sockets/index.js'

// type RequestInfo = {
//   hostname: Request["hostname"], 
//   httpVersion: Request["httpVersion"], 
//   ip: Request["ip"], 
//   ips: Request["ips"][], 
//   method: Request["method"], 
//   route: Request["route"]
// }
// type UrlInfo = {
//   url: Request["url"], 
//   baseUrl: Request["baseUrl"], 
//   protocol: Request["protocol"], 
//   params: Request["params"], 
//   path: Request["path"], 
//   query: Request["query"]
// }
// type headers = Request['headers']
// type Body = Record<string, unknown>

export default function processWebhookData(req: Request, res: Response) {
  console.log("call processWebhookData")
  // req.headers
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
