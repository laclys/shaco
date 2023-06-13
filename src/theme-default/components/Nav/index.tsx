import { usePageData } from '@runtime'
import { NavItemWithLink } from 'shared/types'
import { SwitchAppearance } from '../SwitchAppearance'

import styles from './index.module.scss'

export const MenuItem = (item: NavItemWithLink) => {
  return (
    <div className="text-sm font-medium mx-3">
      <a href={item.link} className={styles.link}>
        {item.text}
      </a>
    </div>
  )
}

export const Nav = () => {
  const { siteData } = usePageData()
  const nav = siteData.themeConfig.nav || []

  return (
    <header fixed="~" pos="t-0 l-0" w="full" z="10">
      <div
        flex="~"
        items="center"
        justify="between"
        className={`h-14 divider-bottom ${styles.nav}`}
      >
        <div>
          <a
            href="/"
            className="w-full bg-light-50h-fill text-1rem font-semibold flex items-center"
            hover="opacity-60"
          >
            title
          </a>
        </div>
        <div flex="~">
          <div flex="~">
            {nav.map((item) => (
              <MenuItem {...item} key={item.text} />
            ))}
          </div>
          <div before="menu-item-before" flex="~">
            <SwitchAppearance />
          </div>
          <div className={styles.socialLinkIcon} before="menu-item-before">
            <a href="/">
              <div className="i-carbon-logo-github w-5 h-5 fill-current"></div>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
