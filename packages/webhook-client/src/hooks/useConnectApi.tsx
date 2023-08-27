import { useEffect, useState } from 'react'
import { socket } from '../components/sockets/index.js'
import { ResponseConfig } from '@socialhub/webhooker-utils/Types/Webhooks.js';
const isProd = import.meta.env.PROD

const emitHello = () => {
  socket.emit("hello from client", 'Client connected');
}

export default function useConnectApi() {
  const [apiConnected, setApiConnected] = useState<boolean>(false)
  const [data, setData] = useState<ResponseConfig>()
  const endpoint = isProd 
        ? import.meta.env.VITE_API_ENDPOINT + "/config" 
        : import.meta.env.VITE_API_ENDPOINT + ":4000" + "/config" 
  useEffect(() => {
    const connectWebhookApi = async () => {
      const result = await fetch(endpoint)
      if (!result.ok) return
      const data: ResponseConfig = await result.json()
      setData(data)
      setApiConnected(true)
      emitHello()
    }
    connectWebhookApi()
  }, [endpoint])
  
  return {
    apiConnected,
    config: data?.config,
  }
}
