import { Socket, io } from "socket.io-client";
const socketEndpoint = import.meta.env.VITE_API_ENDPOINT + ":" + import.meta.env.VITE_API_PORT
console.log('socketEndpoint', socketEndpoint)
export const socket = io(socketEndpoint);


socket.on('connect', (): void => {
  console.log('Client socket connected')
})
socket.on("connect_error", (err) => {
  console.warn(`client connect_error due to ${err.message}`);
  console.error(err)
});

socket.on('connection', (socket: Socket): void => {
  console.log('Client socket connected', socket.id)
  socket.on('disconnect', () => {
    console.log('Client socket disconnected', socket.id)
  })
})
