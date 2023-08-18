import { Request } from 'express';

// export type WebhookRequest = Record<string, string | number>;
export type WebhookRequest = {
  requestInfo: RequestInfo, 
  urlInfo: UrlInfo, 
  headers: Headers, 
  body: Body
}

export type RequestInfo = {
  hostname: Request["hostname"], 
  httpVersion: Request["httpVersion"], 
  ip: Request["ip"], 
  ips: Request["ips"][], 
  method: Request["method"], 
  route: Request["route"]
}
export type UrlInfo = {
  url: Request["url"], 
  baseUrl: Request["baseUrl"], 
  protocol: Request["protocol"], 
  params: Request["params"], 
  path: Request["path"], 
  query: Request["query"]
}
export type Headers = Request['headers']

export type Body = Record<string, unknown>