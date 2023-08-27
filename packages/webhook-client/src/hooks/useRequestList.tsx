import { WebhookRequest } from '@socialhub/webhooker-utils/Types/Webhooks'
import {useEffect, useState} from 'react'

export type RequestListItem = {
  date: string,
  request: WebhookRequest
}

export default function useRequestList() {
  const [requestList, setRequestList] = useState<RequestListItem[]>()
  
  const addRequestListItem = (webhookRequest: WebhookRequest) => {
    const requestListItem: RequestListItem = {
      date: new Date(Date.now()).toISOString(),
      request: webhookRequest
    }
    let updatedList: RequestListItem[];
    if (!requestList){
      updatedList = [requestListItem]
    } else {
      updatedList = [...requestList, requestListItem]
    }
    setRequestList(updatedList)
    localStorage.setItem("requestList", JSON.stringify(updatedList))
  }
  
  useEffect(()=>{
    const reqList = localStorage.getItem("requestList")
    if (!reqList) return
    const parsedList = JSON.parse(reqList)
    setRequestList(parsedList)
  }, [])

  return {
    requestList,
    addRequestListItem, 
  }
}
