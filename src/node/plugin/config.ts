import { SiteConfig } from 'shared/types/index'
import { Plugin } from 'vite'

const SITE_DATA_ID = 'shaco:site-data'

export function pluginConfig(config: SiteConfig): Plugin {
  return {
    name: 'shaco:config',
    resolveId(id) {
      if (id === SITE_DATA_ID) {
        // vite中虚拟模块以'\0'开头
        return '\0' + SITE_DATA_ID
      }
    },
    load(id) {
      if (id === '\0' + SITE_DATA_ID) {
        return `export default ${JSON.stringify(config.siteData)}`
      }
    }
  }
}
