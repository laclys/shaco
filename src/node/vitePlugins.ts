import { Plugin } from 'vite'
import { pluginIndexHtml } from './plugin/indexHtml'
import pluginReact from '@vitejs/plugin-react'
import { pluginConfig } from './plugin/config'
import { pluginRoutes } from './plugin-routes'
import { createPluginMdx } from './plugin-mdx'
import path from 'path'
import { SiteConfig } from 'shared/types'
import pluginUnocss from 'unocss/vite'
import unoCss from './unocssOpts'
import { PACKAGE_ROOT } from './constants'
import babelPluginIsland from './babel-plugin-island'

export async function createVitePlugins(
  config: SiteConfig,
  restartServer: () => Promise<void>,
  isSsr: boolean
) {
  return [
    pluginUnocss(unoCss),
    pluginIndexHtml(),
    pluginReact({
      jsxRuntime: 'automatic',
      jsxImportSource: isSsr
        ? path.join(PACKAGE_ROOT, 'src', 'runtime')
        : 'react',
      babel: {
        plugins: [babelPluginIsland]
      }
    }),
    pluginConfig(config, restartServer),
    pluginRoutes({
      root: config.root,
      isSsr
    }),
    await createPluginMdx()
  ] as Plugin[]
}
