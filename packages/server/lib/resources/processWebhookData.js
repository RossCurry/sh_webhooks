import { io as socket } from './sockets/index.js';
export default function processWebhookData(req, res) {
    console.log("call processWebhookData");
    const { body, url, baseUrl, cookies, hostname, httpVersion, ip, ips, method, protocol, params, path, query, route, headers } = req;
    const requestInfo = {
        hostname, httpVersion, ip, ips, method, route
    };
    const urlInfo = {
        url, baseUrl, protocol, params, path, query
    };
    socket.emit('webhookEvent', { requestInfo, urlInfo, headers, body });
    res.end().status(200);
}
//# sourceMappingURL=processWebhookData.js.map