import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { emitSocket, socket } from './sockets'

function App() {
  // const [count, setCount] = useState(0)
  const [apiConnected, setApiConnected] = useState<boolean>(false)
  const [socketConnected, setSocketConnected] = useState<boolean>(false)
  const [data, setData] = useState<Record<string, string>>()

  socket.on('connect', () => {
    setSocketConnected(true)
  })

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
        {socketConnected && <a href="https://socket.io" target="_blank">
          <img src={'https://upload.wikimedia.org/wikipedia/commons/9/96/Socket-io.svg'} className="logo" alt="Socket IO logo" />
        </a>}
      </div>
      <h1>Vite + React + SocketIO</h1>
      <div className="card">
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
        {apiConnected && <h3>API Connected</h3>}
        {data && <p>{data.message}</p>}
      </div>
      <div className="card">
        {socketConnected && <h3>Socket Connected</h3>}
      </div>
    </>
  )
}

export default App
