import { createServer } from 'vite'
import { PACKAGE_ROOT } from './constants'
import { resolveConfig } from './config'
import { createVitePlugins } from './vitePlugins'

export async function createDevServer(
  root = process.cwd(),
  restart: () => Promise<void>
) {
  const config = await resolveConfig(root, 'serve', 'development')
  // console.log('config', config)
  return createServer({
    root: PACKAGE_ROOT,
    plugins: await createVitePlugins(config, restart, false),
    server: {
      fs: {
        allow: [PACKAGE_ROOT]
      }
    }
  })
}
