import { useEffect, useState } from 'react'
import { socket } from '../components/sockets/index.js'
const isProd = import.meta.env.PROD

const emitHello = () => {
  socket.emit("hello from client", 'Client connected');
}

export default function useConnectApi() {
  const [apiConnected, setApiConnected] = useState<boolean>(false)
  const [data, setData] = useState<{ secret: string }>()
  const endpoint = isProd 
        ? import.meta.env.VITE_API_ENDPOINT + "/secret" 
        : import.meta.env.VITE_API_ENDPOINT + ":4000" + "/secret" 
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
