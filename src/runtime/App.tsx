import { routes } from 'shaco:routes'
import { matchRoutes } from 'react-router-dom'
import { Layout } from '../theme-default'
import { PageData } from 'shared/types'
import { Route } from 'node/plugin-routes'
import siteData from 'shaco:site-data'

export async function initPageData(routePath: string): Promise<PageData> {
  // 获取路由组件编译后的模块内容
  const matched = matchRoutes(routes, routePath)

  if (matched) {
    const route = matched[0].route as Route
    console.log('route', route)
    const moduleInfo = await route.preload()
    console.log('moduleInfo', moduleInfo)
    return {
      pageType: 'doc',
      siteData,
      frontmatter: moduleInfo.frontmatter,
      pagePath: routePath
    }
  }
  // 404 page data
  return {
    pageType: '404',
    siteData,
    frontmatter: {},
    pagePath: routePath
  }
}

export function App() {
  return <Layout />
}
