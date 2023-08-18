import { io as socket } from './sockets/index.js';
export default function processWebhookData(req, res) {
    console.log("call processWebhookData");
    socket.emit('webhookEvent', req.headers);
    res.end().status(200);
}
//# sourceMappingURL=processWebhookData.js.map