import * as path from 'path'
import fs from 'fs-extra'
import { InlineConfig, build as viteBuild } from 'vite'
import { CLIENT_ENTRY_PATH, PACKAGE_ROOT, SERVER_ENTRY_PATH } from './constants'
import type { RollupOutput } from 'rollup'
import { SiteConfig } from 'shared/types'
import { createVitePlugins } from './vitePlugins'
import { Route } from './plugin-routes'

export async function bundle(root: string, config: SiteConfig) {
  try {
    const resolveViteConfig = async (
      isServer: boolean
    ): Promise<InlineConfig> => {
      return {
        mode: 'production',
        root,
        ssr: {
          // 直接打到产物中
          noExternal: ['react-router-dom']
        },
        plugins: await createVitePlugins(config, undefined, isServer),
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
      return viteBuild(await resolveViteConfig(false))
    }

    const serverBuild = async () => {
      return viteBuild(await resolveViteConfig(true))
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
  render: (path: string) => string,
  root: string,
  clientBundle: RollupOutput,
  routes: Route[]
) {
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === 'chunk' && chunk.isEntry
  )
  await Promise.all(
    routes.map(async (route) => {
      const routePath = route.path
      const appHtml = render(routePath)
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
      const fileName = routePath.endsWith('/')
        ? `${routePath}index.html`
        : `${routePath}.html`
      await fs.ensureDir(path.join(root, 'build', path.dirname(fileName)))
      await fs.writeFile(path.join(root, 'build', fileName), html)
    })
  )
  await fs.remove(path.join(root, '.temp'))
}

export async function build(root: string, config: SiteConfig) {
  // 1. bundle : client + server
  const [clientBundle] = await bundle(root, config)
  // import server-entry
  const serverEntryPath = path.join(PACKAGE_ROOT, root, '.temp', 'ssr-entry.js')
  // console.log('serverEntryPath', serverEntryPath)
  // ssr -> htmt
  const { render, routes } = await import(serverEntryPath)
  await renderPage(render, root, clientBundle as RollupOutput, routes)
}
