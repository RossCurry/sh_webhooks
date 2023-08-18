import './App.css'
import Socket from './components/sockets/Socket'
import Connected from './components/connect/Connect'
import Header from './components/header/Header'

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
