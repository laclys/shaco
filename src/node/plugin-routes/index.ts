import { Plugin } from 'vite'
import { RouteService } from './RouteService'
import { PageModule } from 'shared/types'

interface PluginOptions {
  root: string
  isSsr: boolean
}
export interface Route {
  path: string
  element: React.ReactElement
  preload: () => Promise<PageModule>
}

export const CONVENTIONAL_ROUTE_ID = 'shaco:routes'

export function pluginRoutes(options: PluginOptions): Plugin {
  const routerService = new RouteService(options.root)
  return {
    name: 'shaco:routes',
    async configResolved() {
      await routerService.init()
    },
    resolveId(id) {
      if (id === CONVENTIONAL_ROUTE_ID) {
        return '\0' + id
      }
    },
    load(id: string) {
      if (id === '\0' + CONVENTIONAL_ROUTE_ID) {
        return routerService.generateRoutesCode(options.isSsr || false)
      }
    }
  }
}
