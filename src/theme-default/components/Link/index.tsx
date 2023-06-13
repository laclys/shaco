import { FC } from 'react'
import styles from './index.module.scss'

const EXTERNAL_URL_RE = /^https?/

export interface LinkProps {
  href?: string
  children?: React.ReactNode
  className?: string
}

export const Link: FC<LinkProps> = (props) => {
  const { href = '/', children, className = '' } = props
  const isExternal = EXTERNAL_URL_RE.test(href)
  const target = isExternal ? '_blank' : ''
  const rel = isExternal ? 'noopener noreferrer' : undefined
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`${styles.link} ${className}`}
    >
      {children}
    </a>
  )
}
