import style from './badge.module.css'

type BadgeProps = {
  isConnected: boolean,
  title: string
}
export default function Badge(props: BadgeProps) {
  const { isConnected, title } = props
  const badgeClass = isConnected ? style.connected : style.disconnected
  return (
    <>
    <div className={style.connectedHeader}>
          <div className={style.badge}>
            <div className={badgeClass}>
            </div>
          </div>
          <h3>{title}</h3>
        </div>
    </>
  )
}
