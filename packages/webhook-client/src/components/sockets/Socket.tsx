import React, { useState } from 'react'
import { socket } from './index.js'
import style from './Socket.module.css'
import { WebhookRequest } from '@socialhub/webhooker-utils/Types/Webhooks'
import Badge from '../badge/badge.js'
import useRequestList from '../../hooks/useRequestList.js'


export default function Socket() {
  const [socketConnected, setSocketConnected] = useState<boolean>(false)
  const [currentWebhookRequest, setCurrentWebhookRequest] = useState<WebhookRequest>()
  const { addRequestListItem } = useRequestList()
  
  socket.on('connect', () => {
    setSocketConnected(true)
  })
  socket.on('webhookEvent', (webhookEvent: WebhookRequest) => {
    setCurrentWebhookRequest(webhookEvent)
    addRequestListItem(webhookEvent)
  })

  return (
    <div>
      <div className={style.card}>
        <Badge title='Socket Connected' isConnected={socketConnected} />
        <div className={style.socketInfoContainer}>
          {!currentWebhookRequest && <p>{socketConnected ? "Send Webhook request" : ""}</p>}
        </div>
      </div>
        <hr />
      {currentWebhookRequest &&
        <div className={style.webhookGrid}>
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
  const RequestInfo = JSON.parse(JSON.stringify(props.info))
  
  if (!RequestInfo) return <div>no key : val data</div>
  return (
    <div className={style.tableContainer} style={
      { gridArea: props.gridPosition, 
        gridColumn: props.colPos, 
        gridRow: props.rowPos 
      }}>
      <TableHeader 
        displayAsJson={displayAsJson}
        showSelectors={!!props.isBody}
        title={props.title}
        setDisplayAsJson={setDisplayAsJson}
      />
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



type TableHeaderProps = {
  title: string,
  showSelectors: boolean,
  displayAsJson: boolean,
  setDisplayAsJson: React.Dispatch<React.SetStateAction<boolean>>
}
function TableHeader(props: TableHeaderProps) {
  const { setDisplayAsJson, displayAsJson, showSelectors, title } = props
  
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    if (value === "json") setDisplayAsJson(true)
    else setDisplayAsJson(false)
  }
  
  return (
    <div className={style.tableHeader}>
        <h3>{title}</h3>
      <div className={style.tableDisplaySelectors}>
          {showSelectors && <>
            <label htmlFor="json">json</label>
            <input type="radio" name="content-type" id="json" value={"json"} onChange={handleOnChange} checked={displayAsJson}/>
            <label htmlFor="record">record</label>
            <input type="radio" name="content-type" id="record" value={"record"} onChange={handleOnChange}/>
          </>}
        </div>
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
