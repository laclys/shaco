import { createServer } from 'vite'
import pluginReact from '@vitejs/plugin-react'
import { pluginIndexHtml } from './plugin/indexHtml'
import { PACKAGE_ROOT } from './constants'
import { resolveConfig } from './config'
import { pluginConfig } from './plugin/config'
import { pluginRoutes } from './plugin-routes'

export async function createDevServer(
  root = process.cwd(),
  restart: () => Promise<void>
) {
  const config = await resolveConfig(root, 'serve', 'development')
  // console.log('config', config)
  return createServer({
    root: PACKAGE_ROOT,
    plugins: [
      pluginIndexHtml(),
      pluginReact(),
      pluginConfig(config, restart),
      pluginRoutes({
        root: config.root
      })
    ],
    server: {
      fs: {
        allow: [PACKAGE_ROOT]
      }
    }
  })
}
