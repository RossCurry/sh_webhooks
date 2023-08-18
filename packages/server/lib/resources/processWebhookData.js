import { io as socket } from './sockets/index.js';
export default function processWebhookData(req, res) {
    socket.emit('webhookEvent', req.headers);
}
//# sourceMappingURL=processWebhookData.js.map