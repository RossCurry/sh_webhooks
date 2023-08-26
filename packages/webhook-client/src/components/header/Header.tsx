import React from 'react'
import reactLogo from '/react.svg'
import viteLogo from '/vite.svg'
import style from './Header.module.css'


export default function Header() {
  return (
    <div className={style.headerContainer}>
      <h1>Webhooks + SocketIO</h1>
      <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className={style.logo} alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className={`${style.logo} ${style.react}`} alt="React logo" />
      </a>
      <a href="https://socket.io" target="_blank">
        <img src={'https://upload.wikimedia.org/wikipedia/commons/9/96/Socket-io.svg'} className={style.logo} alt="Socket IO logo" />
      </a>
    </div>
  )
}
