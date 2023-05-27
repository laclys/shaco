import * as path from 'path'
import fs from 'fs-extra'
import pluginReact from '@vitejs/plugin-react'
import { InlineConfig, build as viteBuild } from 'vite'
import { CLIENT_ENTRY_PATH, PACKAGE_ROOT, SERVER_ENTRY_PATH } from './constants'
import type { RollupOutput } from 'rollup'
import { SiteConfig } from 'shared/types'
import { pluginConfig } from './plugin/config'

export async function bundle(root: string, config: SiteConfig) {
  try {
    const resolveViteConfig = (isServer: boolean): InlineConfig => {
      return {
        mode: 'production',
        root,
        ssr: {
          // 直接打到产物中
          noExternal: ['react-router-dom']
        },
        plugins: [pluginReact(), pluginConfig(config)],
        build: {
          ssr: isServer,
          outDir: isServer ? '.temp' : 'build',
          rollupOptions: {
            input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
            output: {
              format: isServer ? 'cjs' : 'esm'
            }
          }
        }
      }
    }

    const clientBuild = async () => {
      return viteBuild(resolveViteConfig(false))
    }

    const serverBuild = () => {
      return viteBuild(resolveViteConfig(true))
    }
    console.log('building client & server bundles...')
    const [clientBundle, serverBundle] = await Promise.all([
      clientBuild(),
      serverBuild()
    ])
    return [clientBundle, serverBundle]
  } catch (e) {
    console.log(e)
  }
}

export async function renderPage(
  render: () => string,
  root: string,
  clientBundle: RollupOutput
) {
  const appHtml = render()
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === 'chunk' && chunk.isEntry
  )
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>title</title>
      <meta name="description" content="xxx">
    </head>
    <body>
      <div id="root">${appHtml}</div>
      <script type="module" src="/${clientChunk?.fileName}"></script>
    </body>
  </html>`.trim()
  // await fs.ensureDir(path.join(root, 'build'))
  await fs.writeFile(path.join(root, 'build/index.html'), html)
  await fs.remove(path.join(root, '.temp'))
}

export async function build(root: string, config: SiteConfig) {
  // 1. bundle : client + server
  const [clientBundle] = await bundle(root, config)
  // import server-entry
  const serverEntryPath = path.join(PACKAGE_ROOT, root, '.temp', 'ssr-entry.js')
  // console.log('serverEntryPath', serverEntryPath)
  // ssr -> htmt
  const { render } = await import(serverEntryPath)
  await renderPage(render, root, clientBundle as RollupOutput)
}
