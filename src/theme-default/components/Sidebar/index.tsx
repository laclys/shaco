import { FC } from 'react'
import { SidebarGroup, SidebarItem } from 'shared/types'
import { Link } from '../Link'

import styles from './index.module.scss'

interface IProps {
  sidebarData: SidebarGroup[]
  pathname: string
}

export const Sidebar: FC<IProps> = ({ sidebarData, pathname }) => {
  const renderGroupItem = (item: SidebarItem) => {
    const active = item.link === pathname //high light!
    return (
      <div ml="5">
        <div
          p="1"
          block="~"
          text="sm"
          font-medium="~"
          className={`${active ? 'text-brand' : 'text-text-2'}`}
        >
          <Link href={item.link}>{item.text}</Link>
        </div>
      </div>
    )
  }

  const renderGroup = (item: SidebarGroup) => {
    return (
      <section key={item.text} block="~" not-first="divider-top mt-4">
        <div flex="~" items="center">
          <h2 m="t-3 b-2" text="1rem text-1" font="bold">
            {item.text}
          </h2>
        </div>
        <div mb="1">
          {item.items?.map((item) => (
            <div key={item.link}>{renderGroupItem(item)}</div>
          ))}
        </div>
      </section>
    )
  }
  return (
    <aside className={styles.sidebar}>
      <nav>{sidebarData.map(renderGroup)}</nav>
    </aside>
  )
}
