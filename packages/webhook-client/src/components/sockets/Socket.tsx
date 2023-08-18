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
    console.log('webhookEvent', webhookEvent)
  })

  if (!socketConnected) return null
  return (
    <div>
      <div className={style.card}>
        <h3>Socket Connected</h3>
        <div className={style.socketInfoContainer}>
          {!currentWebhookRequest && <p>Send Webhook request</p>}
        </div>
      </div>
      {currentWebhookRequest &&
        // JSON.stringify(Object.keys(currentWebhookRequest))
        <div className={style.webhookGrid}>
          <div>
            <Headers title='Request Info' headers={currentWebhookRequest.requestInfo} />
            <Headers title='Url Info' headers={currentWebhookRequest.urlInfo} />
          </div>
          <Headers title='Header Info' headers={currentWebhookRequest.headers} />
          <Headers title='Body Info' headers={currentWebhookRequest.body} />
        </div>
      }
    </div>
  )
}

type HProps = {
  // headers: WebhookRequest["headers"]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers: Record<string, any>
  title: string
}
function Headers(props: HProps) {
  const { title } = props
  const headers = JSON.parse(JSON.stringify(props.headers))
  console.log(Object.entries(headers))
  if (!headers) return <div>no key : val data</div>
  return (
    <div>
      <h2>{title}</h2>
      <table className={style.table}>
        {/* <thead>
          <tr>
            <th><td></td></th>
            <th><td></td></th>
          </tr>
        </thead> */}
        <tbody>
          {headers && Object.entries(headers).map(([key, val], i) => {
            console.log([key, val])
            if (typeof val !== 'string') return null
          return (
            <tr className={style.row} key={key+i}>
              <td>
                <span className={style.tableItem}>{key}</span>
              </td>
              <td>
              <span className={style.tableItem}>{val}</span>
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}