import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import http from "http";
import { Server } from 'socket.io';
dotenv.config();
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(bodyParser.json());
const SOCKET_PORT = process.env.SOCKET_PORT || 3005;
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});
io.on("connection", (socket) => {
    console.info('Emitting socket');
    socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });
    socket.on("hello from client", (...args) => {
        console.info('Message from client', args);
    });
});
io.on("connect_error", (err) => {
    console.error(err);
    console.log(`connect_error due to ${err.message}`);
});
server.listen(SOCKET_PORT, () => {
    console.log(`Socket server is running on port ${SOCKET_PORT} 💥`);
});
//# sourceMappingURL=index.js.map