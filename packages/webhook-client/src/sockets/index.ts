import { io } from "socket.io-client";

export const socket = io('http://localhost:3005/');

socket.on('connect', (): void => {
  console.log('Client socket connected')
})
socket.on("connect_error", (err) => {
  console.error(err)
  console.log(`client connect_error due to ${err.message}`);
});


export const emitSocket = () => {
  socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });
}

// receive a message from the server
socket.on("hello from server", (...args) => {
  // ...
  console.log('Server message socket args', args)
});

