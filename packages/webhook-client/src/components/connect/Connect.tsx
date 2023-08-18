import { useEffect, useState } from 'react'
import useConnectApi from '../../hooks/useConnectApi'
import style from './Connected.module.css'
import { socket } from '../sockets'

export default function Connected() {
  const { apiConnected, secret } = useConnectApi()
  const [currentSecret, setCurrentSecret] = useState<string>(secret || '')
  const [buttonAction, setButtonAction] = useState<"submit" | "showForm">("showForm")
  const [inputValue, setInputValue] = useState<string>(secret || '')
  const previousSecret = secret || ''

  const buttonInnerText = {
    showForm: 'change secret',
    submit: !inputValue ? 'cancel' : 'update secret'
  }

  const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (buttonAction === "showForm"){
      setButtonAction("submit")
    }
    if (buttonAction === "submit"){
      console.log("acction submit")
      if (!inputValue){
        // change some color
        // warn user
        setButtonAction("showForm")
        return
      }
      // POST request
      // TODO setWaiting
      const body = JSON.stringify({ secret: inputValue })
      console.log('body', body)
      const result = await fetch('http://localhost:4000/secret', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      })
      // TODO setError
      if (!result.ok) setInputValue(previousSecret)
      const data = await result.json()
      console.log('return value', data.updatedSecret)
      setInputValue('')
      setCurrentSecret(data.updatedSecret)
      setButtonAction("showForm")
    }

  }
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setInputValue(inputValue)
  }


  /**
   * There's no DB just initial values on the server
   * This socket resets the secret to hard coded value in server 
   * if something has gone wrong on the server
   */
  socket.on("hello from server", (args: { secret: string }) => {
    if (currentSecret !== args.secret ){
      setCurrentSecret(args.secret)
    }
  });

  useEffect(() => {
    if (secret) setCurrentSecret(secret)
  }, [secret])

  if (!apiConnected) return null
  return (
    <div className={style.card}>
        <h3>API Connected</h3>
        <form>
          <label id="secret">
            webhook secret:
            {buttonAction === "submit" && <input type="text" name="secret" id="secret" placeholder={currentSecret} onChange={handleOnChange} value={inputValue}/>}
          </label>
          {buttonAction === "showForm" && currentSecret && <p>{currentSecret}</p>}
          <button type="button" onClick={handleOnClick}>{buttonInnerText[buttonAction]}</button>
        </form>
      </div>
  )
}