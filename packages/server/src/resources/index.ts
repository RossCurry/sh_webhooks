import express from 'express';
import bodyParser from 'body-parser'
import { Server } from "socket.io";
import verify from './verify.js'
import processWebhookData from './processWebhookData.js';
import connectSocket from './connectSocket.js'
export const router = express.Router();

// const io = new Server().listen(3005)

// io.on("connection", (socket) => {
//   console.info('Emitting socket')
//   // send a message to the client
//   socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });

//   // receive a message from the client
//   socket.on("hello from client", (...args: any): void => {
//     console.info('socket server args', args)
//     // ...
//   });
// });
// io.on("connect_error", (err: Error): void => {
//   console.log(`connect_error due to ${err.message}`);
// });



router.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// router.use('/',
//   connectSocket
// )

router.post('/webhook',
  bodyParser.json(),
  verify,
  processWebhookData
);

