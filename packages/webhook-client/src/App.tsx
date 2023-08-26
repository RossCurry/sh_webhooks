import './App.css'
import Socket from './components/sockets/Socket.js'
import Connected from './components/connect/Connect.js'
import Header from './components/header/Header.js'

function App() {

  return (
    <>
      <Header />
      <Connected />
      <Socket />
    </>
  )
}

export default App
