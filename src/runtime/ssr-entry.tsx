import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import { App, initPageData } from './App'
import { DataContext } from './hooks'

export interface RenderResult {
  appHtml: string
  islandProps: unknown[]
  islandToPathMap: Record<string, string>
}

export async function render(pagePath: string, helmetContext: object) {
  const pageData = await initPageData(pagePath)
  const { clearIslandData, data } = await import('./jsx-runtime')
  clearIslandData()
  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <DataContext.Provider value={pageData}>
        <StaticRouter location={pagePath}>
          <App />
        </StaticRouter>
      </DataContext.Provider>
    </HelmetProvider>
  )
  const { islandProps, islandToPathMap } = data
  return {
    appHtml,
    islandProps,
    islandToPathMap
  }
}

export { routes } from 'shaco:routes'
