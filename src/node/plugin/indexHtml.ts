import { readFile } from 'fs/promises'
import { Plugin } from 'vite'
import { DEFAULT_TEMPLATE_PATH } from '../constants'

export function pluginIndexHtml(): Plugin {
  return {
    name: 'shaco:index-html',
    apply: 'serve',
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          // read template.html
          let content = await readFile(DEFAULT_TEMPLATE_PATH, 'utf-8')
          try {
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
    },
  }
}
