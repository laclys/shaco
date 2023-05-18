import { createServer } from 'vite'
import pluginReact from '@vitejs/plugin-react'
import { pluginIndexHtml } from './plugin/indexHtml'

export async function createDevServer(root = process.cwd()) {
  return createServer({
    root,
    plugins: [pluginIndexHtml(), pluginReact()]
  })
}
