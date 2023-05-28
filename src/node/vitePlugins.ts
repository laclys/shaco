import { Plugin } from 'vite'
import { pluginIndexHtml } from './plugin/indexHtml'
import pluginReact from '@vitejs/plugin-react'
import { pluginConfig } from './plugin/config'
import { pluginRoutes } from './plugin-routes'
import { createPluginMdx } from './plugin-mdx'
import { SiteConfig } from 'shared/types'

export function createVitePlugins(
  config: SiteConfig,
  restartServer?: () => Promise<void>
) {
  return [
    pluginIndexHtml(),
    pluginReact({
      jsxRuntime: 'automatic'
    }),
    pluginConfig(config, restartServer),
    pluginRoutes({
      root: config.root
    }),
    createPluginMdx()
  ] as Plugin[]
}
