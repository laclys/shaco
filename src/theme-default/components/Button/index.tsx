import { FC, createElement } from 'react'
import { Link } from '../Link'

import styles from './index.module.scss'

interface ButtonProps {
  type?: string
  size?: 'medium' | 'big'
  theme?: 'brand' | 'alt'
  text: string
  href?: string
  external?: boolean
  className?: string
}

export const Button: FC<ButtonProps> = (props: ButtonProps) => {
  const {
    theme = 'brand',
    size = 'big',
    href = '/',
    external = false,
    className = ''
  } = props
  let type: string | typeof Link | null = null

  if (props.type === 'button') {
    type = 'button'
  } else if (props.type === 'a') {
    type = external ? 'a' : Link
  }

  return createElement(
    type ?? 'a',
    {
      className: `${styles.button} ${styles[theme]} ${styles[size]} ${className}`,
      href
    },
    props.text
  )
}
