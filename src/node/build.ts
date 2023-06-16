import * as path from 'path'
import fs from 'fs-extra'
import { InlineConfig, build as viteBuild } from 'vite'
import {
  CLIENT_ENTRY_PATH,
  EXTERNALS,
  MASK_SPLITTER,
  PACKAGE_ROOT,
  SERVER_ENTRY_PATH
} from './constants'
import type { RollupOutput } from 'rollup'
import { HelmetData } from 'react-helmet-async'
import { SiteConfig } from 'shared/types'
import { createVitePlugins } from './vitePlugins'
import { Route } from './plugin-routes'
import { RenderResult } from '../runtime/ssr-entry'

const CLIENT_OUTPUT = 'build'

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
          noExternal: ['react-router-dom', 'lodash-es'] // ssr产物都是Cjs的
        },
        plugins: await createVitePlugins(config, undefined, isServer),
        build: {
          ssr: isServer,
          outDir: isServer ? '.temp' : 'build',
          rollupOptions: {
            input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
            output: {
              format: isServer ? 'cjs' : 'esm'
            },
            external: EXTERNALS
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

    await fs.copy(
      path.join(PACKAGE_ROOT, 'vendors'),
      path.join(root, CLIENT_OUTPUT)
    )

    return [clientBundle, serverBundle]
  } catch (e) {
    console.log(e)
  }
}
async function buildIslands(
  root: string,
  islandPathToMap: Record<string, string>
) {
  // 根据 islandPathToMap 拼接模块代码内容
  const islandsInjectCode = `
    ${Object.entries(islandPathToMap)
      .map(
        ([islandName, islandPath]) =>
          `import { ${islandName} } from '${islandPath}'`
      )
      .join('')}
window.ISLANDS = { ${Object.keys(islandPathToMap).join(', ')} };
window.ISLAND_PROPS = JSON.parse(
  document.getElementById('island-props').textContent
);
  `
  const injectId = 'shaco:inject'
  return viteBuild({
    mode: 'production',
    esbuild: {
      jsx: 'automatic'
    },
    build: {
      // 输出目录
      outDir: path.join(root, '.temp'),
      rollupOptions: {
        input: injectId,
        external: EXTERNALS
      }
    },
    plugins: [
      {
        name: 'shaco:inject',
        enforce: 'post',
        resolveId(id) {
          if (id.includes(MASK_SPLITTER)) {
            const [originId, importer] = id.split(MASK_SPLITTER)
            return this.resolve(originId, importer, { skipSelf: true })
          }

          if (id === injectId) {
            return id
          }
        },
        load(id) {
          if (id === injectId) {
            return islandsInjectCode
          }
        },
        generateBundle(_, bundle) {
          for (const name in bundle) {
            if (bundle[name].type === 'asset') {
              delete bundle[name]
            }
          }
        }
      }
    ]
  })
}

export async function renderPage(
  render: (path: string, helmetContext: object) => RenderResult,
  root: string,
  clientBundle: RollupOutput,
  routes: Route[]
) {
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === 'chunk' && chunk.isEntry
  )

  const normalizeVendorFilename = (fileName: string) =>
    fileName.replace(/\//g, '_') + '.js'

  await Promise.all(
    [
      ...routes,
      {
        path: '/404'
      }
    ].map(async (route) => {
      const routePath = route.path
      const helmetContext = {
        context: {}
      } as HelmetData
      const {
        appHtml,
        islandToPathMap,
        islandProps = []
      } = await render(routePath, helmetContext.context)
      const styleAssets = clientBundle.output.filter(
        (chunk) => chunk.type === 'asset' && chunk.fileName.endsWith('.css')
      )
      const islandBundle = await buildIslands(root, islandToPathMap)
      const islandsCode = (islandBundle as RollupOutput).output[0].code
      const { helmet } = helmetContext.context
      const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width,initial-scale=1">
          ${helmet?.title?.toString() || ''}
          ${helmet?.meta?.toString() || ''}
          ${helmet?.link?.toString() || ''}
          ${helmet?.style?.toString() || ''}
          <meta name="description" content="xxx">
            ${styleAssets
              .map((item) => `<link rel="stylesheet" href="/${item.fileName}">`)
              .join('\n')}
            <script type="importmap">
              {
                "imports": {
                  ${EXTERNALS.map(
                    (name) => `"${name}": "/${normalizeVendorFilename(name)}"`
                  ).join(',')}
                }
              }
            </script>
        </head>
        <body>
          <div id="root">${appHtml}</div>
          <script type="module">${islandsCode}</script>
          <script type="module" src="/${clientChunk?.fileName}"></script>
          <script id="island-props">${JSON.stringify(islandProps)}</script>
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
