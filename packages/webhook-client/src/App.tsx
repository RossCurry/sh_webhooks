import './App.css'
import Socket from './components/sockets/Socket.js'
import Connected from './components/connect/Connect.js'
import Header from './components/header/Header.js'
import RequestList from './components/requestList/RequestList.js'

function App() {

  // TODO add list
  return (
    <div id="app">
      <section>
        {/* <RequestList /> */}
      </section>
      <main>
        <Header />
        <Connected />
        <Socket />
      </main>
    </div>
  )
}

export default App
