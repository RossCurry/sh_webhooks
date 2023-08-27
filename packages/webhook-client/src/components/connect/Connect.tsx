import { useEffect, useState } from 'react'
import useConnectApi from '../../hooks/useConnectApi.js'
import style from './Connected.module.css'
import { socket } from '../sockets/index.js'
import Badge from '../badge/badge.js'
const isProd = import.meta.env.PROD

type ButtonActions = "submit" | "showForm"

export default function Connected() {
  const { apiConnected, config } = useConnectApi()
  
  return (
    <div className={style.card}>
        <div className={style.connectHeader}>
          <Badge isConnected={apiConnected} title={"API Connected"} />
          <Validation />
        </div>
        <hr />
        {config?.useValidation && <Secret />}
      </div>
  )
}



function Validation() {
  const { config, apiConnected } = useConnectApi()
  const [useValidation, setUseValidation] = useState<boolean>(!!config?.useValidation)
  
  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked
    
    const endpoint = isProd 
        ? import.meta.env.VITE_API_ENDPOINT + "/validation" 
        : import.meta.env.VITE_API_ENDPOINT + ":4000" + "/validation" 
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ useValidation: isChecked })
    })
    const updatedValidation = await result.json()
    if (updatedValidation.updatedValidation !== isChecked) throw new Error('Server state doesnt match')
    setUseValidation(isChecked)
  }

  useEffect(()=>{
    if (config) setUseValidation(config.useValidation)
  }, [config])

  if (!apiConnected || !config) return null
  return (
    <form>
      <label htmlFor="useValidation" className={style.secretLabel}>Use Socialhub validation</label>
      <input type="checkbox" name="useValidation" id="useValidation" checked={useValidation} onChange={handleOnChange}/>
    </form>
  )
}


function Secret() {
  const { config } = useConnectApi()
 
  const [inputValue, setInputValue] = useState<string>(config?.secret || '')
  const [buttonAction, setButtonAction] = useState<ButtonActions>("showForm")
  const [currentSecret, setCurrentSecret] = useState<string>(config?.secret || '')
  const previousSecret = config?.secret || ''

  const buttonInnerText = {
    showForm: 'change',
    submit: !inputValue ? 'cancel' : 'update'
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setInputValue(inputValue)
  }

  const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (buttonAction === "showForm"){
      setButtonAction("submit")
    }
    if (buttonAction === "submit"){
      if (!inputValue){
        // change some color
        // warn user
        setButtonAction("showForm")
        return
      }
      // POST request
      // TODO setWaiting
      const body = JSON.stringify({ secret: inputValue })
      const endpoint = isProd 
        ? import.meta.env.VITE_API_ENDPOINT + "/secret" 
        : import.meta.env.VITE_API_ENDPOINT + ":4000" + "/secret" 
      const result = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      })
      // TODO setError
      if (!result.ok) setInputValue(previousSecret)
      const data = await result.json()
      setInputValue('')
      setCurrentSecret(data.updatedSecret)
      setButtonAction("showForm")
    }

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
    if (config?.secret) setCurrentSecret(config.secret)
  }, [config?.secret])

  return (
    <form>
          <label id="secret" className={style.secretLabel}>
            webhook secret:
          </label>
          <div className={style.secretWrapper}>
            {buttonAction === "submit" && 
              <input type="text" name="secret" id="secret" placeholder={currentSecret} onChange={handleOnChange} value={inputValue}/>
            }
            {buttonAction === "showForm" && currentSecret && 
              <span className={style.currentSecret}>
                {currentSecret}
              </span>
            }
            <button type="submit" onClick={handleOnClick}>{buttonInnerText[buttonAction]}</button>
          </div>
        </form>
  )
}
