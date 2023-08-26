import React, { useState } from 'react'
import { socket } from '.'
import style from './Socket.module.css'
import { WebhookRequest } from '@socialhub/webhooker-utils/Types/Webhooks'
import { exampleResponse } from '../../assets/example-response'

export default function Socket() {
  const [socketConnected, setSocketConnected] = useState<boolean>(false)
  const [currentWebhookRequest, setCurrentWebhookRequest] = useState<WebhookRequest>(exampleResponse)
  
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
          {/* <div> */}
            <RequestInfoTable 
              key='Request Info' 
              title='Request Info' 
              info={currentWebhookRequest.requestInfo}  
              gridPosition='top-left'
              colPos='1 / 7'
              rowPos='1 / 3'
            />
            <RequestInfoTable 
              key='Url Info' 
              title='Url Info' 
              info={currentWebhookRequest.urlInfo} 
              gridPosition='top-left'
              colPos='1 / 7'
              rowPos='3 / 6'
            />
          {/* </div> */}
          <RequestInfoTable 
            key='Header Info' 
            title='Header Info' 
            info={currentWebhookRequest.headers} 
            gridPosition='top-right'
            colPos=' 7 / 13'
            rowPos='1 / 6'
          />
          <RequestInfoTable 
            key='Body Info' 
            title='Body Info' 
            info={currentWebhookRequest.body} 
            gridPosition='bottom-left'
            colPos='1 / 13'
            rowPos='6 / 13'
            isBody={true}
          />
        </div>
      }
    </div>
  )
}

type HProps = {
  // headers: WebhookRequest["headers"]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info: Record<string, any>
  title: string,
  gridPosition?:  "top-left" | "top-right" | "bottom-left" | "bottom-right",
  colPos?: string,
  rowPos?: string,
  isBody?: boolean
}
function RequestInfoTable(props: HProps) {
  const [displayAsJson, setDisplayAsJson] = useState<boolean>(props.isBody ? true : false)
  const { title } = props
  const RequestInfo = JSON.parse(JSON.stringify(props.info))
  console.log(Object.entries(RequestInfo))
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    if (value === "json") setDisplayAsJson(true)
    else setDisplayAsJson(false)
  }
  if (!RequestInfo) return <div>no key : val data</div>
  return (
    <div className={style.tableContainer} style={
      { gridArea: props.gridPosition, 
        gridColumn: props.colPos, 
        gridRow: props.rowPos 
      }}>
      <div className={style.tableHeader}>
        <h3>{title}</h3>
        <div className={style.tableDisplaySelectors}>
          {props.isBody && <>
            <label htmlFor="json">json</label>
            <input type="radio" name="content-type" id="json" value={"json"} onChange={handleOnChange} checked={displayAsJson}/>
            <label htmlFor="record">record</label>
            <input type="radio" name="content-type" id="record" value={"record"} onChange={handleOnChange}/>
          </>}
        </div>
      </div>
      <hr />
      <table className={style.table}>
        <tbody>
          {RequestInfo && 
            displayAsJson 
            ? <AsJson content={RequestInfo}/>
            : <AsRecord requestInfo={RequestInfo}/>
          }
        </tbody>
      </table>
    </div>
  )
}

type AsJsonProps = {
  content: Record<string, string>
}
function AsJson(props: AsJsonProps) {
  const { content } = props
  return (
    <><pre>{JSON.stringify(content, null, 2)}</pre></>
  )
}
type AsRecordProps = {
  requestInfo: Record<string, string>
}
function AsRecord(props: AsRecordProps) {
  const { requestInfo } = props
  return (
    <>{Object.entries(requestInfo).map(([key, val], i) => {
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
  })}</>
  )
}
