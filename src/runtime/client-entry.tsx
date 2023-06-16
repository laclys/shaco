import { ComponentType } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import siteData from 'shaco:site-data'
import { App, initPageData } from './App'
import { DataContext } from './hooks'

declare global {
  interface Window {
    ISLANDS: Record<string, ComponentType<unknown>>
    ISLAND_PROPS: unknown[]
  }
}

async function renderInBrowser() {
  console.log('siteData', siteData)
  const containerEl = document.getElementById('root')
  if (!containerEl) {
    throw new Error('#root element not found')
  }

  if (import.meta.env.DEV) {
    // init page data
    const pageData = await initPageData(location.pathname)

    createRoot(containerEl).render(
      <DataContext.Provider value={pageData}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DataContext.Provider>
    )
  } else {
    // 生产环境下的 Partial Hydration
    const islands = document.querySelectorAll('[__island]')
    if (islands.length === 0) {
      return
    }
    for (const island of islands) {
      // Aside:0
      const [id, index] = island.getAttribute('__island').split(':')
      const Element = window.ISLANDS[id] as ComponentType<unknown>
      hydrateRoot(island, <Element {...window.ISLAND_PROPS[index]} />)
    }
  }
}

renderInBrowser()
