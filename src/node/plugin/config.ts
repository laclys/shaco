import { SiteConfig } from 'shared/types/index'
import { Plugin } from 'vite'
import { relative } from 'path'

const SITE_DATA_ID = 'shaco:site-data'

export function pluginConfig(
  config: SiteConfig,
  restart: () => Promise<void>
): Plugin {
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
    },
    async handleHotUpdate(ctx) {
      const customWatchedFiles = [config.configPath]
      const include = (id: string) =>
        customWatchedFiles.some((file) => id.includes(file))

      if (include(ctx.file)) {
        console.log(
          `\n${relative(config.root, ctx.file)} changed, restarting server...`
        )
        // restart Dev Server
        await restart()
      }
    }
  }
}
