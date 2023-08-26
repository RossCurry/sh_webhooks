import { useEffect, useState } from 'react'
import { socket } from '../components/sockets'

const emitHello = () => {
  socket.emit("hello from client", 'Client connected');
}

export default function useConnectApi() {
  const [apiConnected, setApiConnected] = useState<boolean>(false)
  const [data, setData] = useState<{ secret: string }>()
  const endpoint = import.meta.env.VITE_API_ENDPOINT + "/secret"
  console.log('endpoint', endpoint)
  useEffect(() => {
    const connectWebhookApi = async () => {
      const result = await fetch(endpoint)
      if (!result.ok) return
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
  }
}
