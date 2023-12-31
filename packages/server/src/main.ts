import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import  http from "http"
import { Server } from 'socket.io';
import { router } from './resources/index.js';
import { config } from './utils/staticConfig.js';

// Configure env variables
import dotenv from 'dotenv'
dotenv.config()


const corsOptions =  {
  origin: process.env.PROD === "true" ? 'https://sh-webhook-tester.netlify.app' : "*",
  methods: ["GET", "POST"]
}

const app = express();
const server = http.createServer(app);


const socketIoCorsOptions = {
  origin: process.env.PROD === "true" ?  "https://sh-webhook-tester.netlify.app" : "*",
  methods: ["GET", "POST"],
  transports: ['websocket', 'polling'],
  credentials: true
}

export const io = new Server<any, any, any, any>(server, {
  cors: socketIoCorsOptions,
  allowEIO3: true
});

io.on("connection", (socket) => {
  console.info('Emitting socket')
  // send a message to the client
  socket.emit("hello from server", { secret: config.socialHub.manifestSecret });

  // receive a message from the client
  socket.on("hello from client", (...args: any): void => {
    console.info('Message from client', args)
    // ...
  });
});

io.on("connect_error", (err: Error): void => {
  console.error(err)
  console.log(`connect_error due to ${err.message}`);
});

app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(router);

const PORT = process.env.PORT || 3000; 

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});