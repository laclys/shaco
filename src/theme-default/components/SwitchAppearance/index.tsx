import { FC, ReactNode } from 'react'
import { toggle } from '../../logic/toggleAppearance'

import styles from './index.module.scss'

interface IProps {
  className?: string
  children: ReactNode
  onClick?: () => void
  id?: string
}

export const Switch: FC<IProps> = (props) => {
  return (
    <button
      className={`${styles.switch} ${props.className}`}
      id={props.id ?? ''}
      type="button"
      role="switch"
      {...(props.onClick ? { onClick: props.onClick } : {})}
    >
      <span className={styles.check}>
        <span className={styles.icon}>{props.children}</span>
      </span>
    </button>
  )
}

export const SwitchAppearance: FC = () => {
  return (
    <Switch onClick={toggle}>
      <div className={styles.sun}>
        <div className="i-carbon-sun" w="full" h="full"></div>
      </div>
      <div className={styles.moon}>
        <div className="i-carbon-moon" w="full" h="full"></div>
      </div>
    </Switch>
  )
}
