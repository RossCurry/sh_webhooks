import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { emitSocket } from './sockets'
import Socket from './sockets/Socket'

function App() {
  // const [count, setCount] = useState(0)
  const [apiConnected, setApiConnected] = useState<boolean>(false)
  const [data, setData] = useState<Record<string, string>>()

  useEffect(() => {
    const connectWebhookApi = async () => {
      const result = await fetch('http://localhost:4000/')
      const data = await result.json()
      setData(data)
      setApiConnected(true)
      emitSocket()
    }
    connectWebhookApi()
  }, [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://socket.io" target="_blank">
          <img src={'https://upload.wikimedia.org/wikipedia/commons/9/96/Socket-io.svg'} className="logo" alt="Socket IO logo" />
        </a>
      </div>
      <h1>Webhooks + SocketIO</h1>
      <div className="card">
        {apiConnected && <h3>API Connected</h3>}
        {data && <p>{data.message}</p>}
      </div>
      <div>
        <Socket />
      </div>
    </>
  )
}

export default App
