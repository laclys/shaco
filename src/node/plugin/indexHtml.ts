import { readFile } from 'fs/promises'
import { Plugin } from 'vite'
import { DEFAULT_TEMPLATE_PATH, CLIENT_ENTRY_PATH } from '../constants'

export function pluginIndexHtml(): Plugin {
  return {
    name: 'shaco:index-html',
    apply: 'serve',
    // 插入入口 script 标签
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: 'script',
            attrs: {
              type: 'module',
              // /@fs/:
              src: `/@fs/${CLIENT_ENTRY_PATH}`
            },
            injectTo: 'body'
          }
        ]
      }
    },
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          // read template.html
          let content = await readFile(DEFAULT_TEMPLATE_PATH, 'utf-8')
          try {
            // 所有插件的transformIndexHtml 钩子执行一遍 // Transform HTML using Vite plugins. 配合@vitejs/plugin-react实现热更新
            // (https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#middleware-mode)
            content = await server.transformIndexHtml(
              req.url,
              content,
              req.originalUrl
            )
            // response html borwer
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            res.end(content)
          } catch (e) {
            return next(e)
          }
        })
      }
    }
  }
}
