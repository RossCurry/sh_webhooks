import React, { useState } from 'react'
import { socket } from '.'
import style from './Socket.module.css'
import { WebhookRequest } from '@socialhub/webhooker-utils/Types/Webhooks'

export default function Socket() {
  const [socketConnected, setSocketConnected] = useState<boolean>(false)
  const [currentWebhookRequest, setCurrentWebhookRequest] = useState<WebhookRequest>()
  
  socket.on('connect', () => {
    setSocketConnected(true)
  })
  socket.on('webhookEvent', (webhookEvent: WebhookRequest) => {
    setCurrentWebhookRequest(webhookEvent)
  })

  if (!socketConnected) return null
  return (
    <div className={style.card}>
      <h3>Socket Connected</h3>
      <div className="socketInfoContainer">
      {!currentWebhookRequest && <p>Send Webhook request</p>}
      {currentWebhookRequest && Object.entries(currentWebhookRequest).map(([key, val], i) => {
        return (
          <div className="row" key={key+i}>
            <p>{key} : {val}</p>
          </div>
        )
      })}
      </div>
    </div>
  )
}
