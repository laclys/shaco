import { routes } from 'shaco:routes'
import { matchRoutes } from 'react-router-dom'
import { Layout } from '../theme-default'
import { PageData } from 'shared/types'

export async function initPageData(routePath: string) {
  // 获取路由组件编译后的模块内容
  const matched = matchRoutes(routes, routePath)

  if (matched) {
    const route = matched[0].route
    console.log('route', route)
  }
}

export function App() {
  return <Layout />
}
