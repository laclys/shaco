import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { App, initPageData } from './App'
import { DataContext } from './hooks'

export async function render(pagePath: string) {
  const pageData = await initPageData(pagePath)
  const { clearIslandData } = await import('./jsx-runtime')
  clearIslandData()
  return renderToString(
    <DataContext.Provider value={pageData}>
      <StaticRouter location={pagePath}>
        <App />
      </StaticRouter>
    </DataContext.Provider>
  )
}

export { routes } from 'shaco:routes'
