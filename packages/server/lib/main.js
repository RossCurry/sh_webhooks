import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from "http";
import { Server } from 'socket.io';
import { router } from './resources/index.js';
import dotenv from 'dotenv';
import { config } from './utils/staticConfig.js';
dotenv.config();
const corsOptions = process.env.PROD
    ? {
        origin: 'https://sh-webhook-tester.netlify.app/',
        methods: ["GET", "POST"]
    } : {};
const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
    cors: {
        origin: '*'
    }
});
io.on("connection", (socket) => {
    console.info('Emitting socket');
    socket.emit("hello from server", { secret: config.socialHub.manifestSecret });
    socket.on("hello from client", (...args) => {
        console.info('Message from client', args);
    });
});
io.on("connect_error", (err) => {
    console.error(err);
    console.log(`connect_error due to ${err.message}`);
});
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(router);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀`);
});
//# sourceMappingURL=main.js.map