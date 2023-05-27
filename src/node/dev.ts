import { createServer } from 'vite'
import pluginReact from '@vitejs/plugin-react'
import { pluginIndexHtml } from './plugin/indexHtml'
import { PACKAGE_ROOT } from './constants'
import { resolveConfig } from './config'
import { pluginConfig } from './plugin/config'

export async function createDevServer(root = process.cwd()) {
  const config = await resolveConfig(root, 'serve', 'development')
  // console.log('config', config)
  return createServer({
    root,
    plugins: [pluginIndexHtml(), pluginReact(), pluginConfig(config)],
    server: {
      fs: {
        allow: [PACKAGE_ROOT]
      }
    }
  })
}
