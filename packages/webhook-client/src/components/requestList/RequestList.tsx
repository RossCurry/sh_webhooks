import useRequestList from '../../hooks/useRequestList'
import style from "./RequestList.module.css"
// import {requestList} from '../../assets/example-list'
// const rq = requestList as unknown as RequestListItem[]

export default function RequestList() {
  const { requestList } = useRequestList()
  
  return (
    <div className={style.reqListContainer}>
      <header className={style.reqListHeader}>
        <h3>List header</h3>
      </header>
      <ul className={style.requestList}>
        {requestList && requestList.map(reqListItem => {
          return (
            <li key={reqListItem.date} className={style.requestListItem}>
              <div className={style.requestListItemTitle}>
                <h4>{reqListItem.request.requestInfo.method}</h4>
                <p>{reqListItem.request.requestInfo.ip}</p>
              </div>
              <p>{new Date(reqListItem.date).toDateString()}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
