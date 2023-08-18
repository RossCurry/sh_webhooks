import { Request, Response, NextFunction } from 'express';
import { Server } from "socket.io";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
} from '@socialhub/webhooker-utils'


// const io = new Server<
// ClientToServerEvents,
// ServerToClientEvents,
// InterServerEvents,
// SocketData
// >(6000);
// const io = new Server()

// const io = new Server<any, any, any, any>().listen(3005)
// io.on("connection", (socket) => {
//   // send a message to the client
//   socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });

//   // receive a message from the client
//   socket.on("hello from client", (...args: any): void => {
//     console.info('socket server args', args)
//     // ...
//   });
// });

export default function connectSocket(req: Request, res: Response, next: NextFunction) {
  
}