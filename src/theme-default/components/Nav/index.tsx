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
    <header relative="~" w="full">
      <div
        flex="~"
        items="center"
        justify="between"
        className="px-8 h-14 divider-bottom"
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
          <div>
            <SwitchAppearance />
          </div>
          <div className={styles.socialLinkIcon}>
            <a href="/">
              <div className="i-carbon-logo-github w-5 h-5 fill-current"></div>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
