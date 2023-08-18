import { useEffect, useState } from 'react'
import { socket } from '../components/sockets'

const emitHello = () => {
  socket.emit("hello from client", 'Client connected');
}

export default function useConnectApi() {
  const [apiConnected, setApiConnected] = useState<boolean>(false)
  const [data, setData] = useState<{ secret: string }>()

  useEffect(() => {
    const connectWebhookApi = async () => {
      const result = await fetch('http://localhost:4000/secret')
      const data = await result.json()
      setData(data)
      setApiConnected(true)
      emitHello()
    }
    connectWebhookApi()
  }, [])
  
  return {
    apiConnected,
    secret: data?.secret,
    socket
  }
}
