import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import siteData from 'shaco:site-data'
import { App, initPageData } from './App'
import { DataContext } from './hooks'

async function renderInBrowser() {
  console.log('siteData', siteData)
  const containerEl = document.getElementById('root')
  if (!containerEl) {
    throw new Error('#root element not found')
  }
  // init page data
  const pageData = await initPageData(location.pathname)

  createRoot(containerEl).render(
    <DataContext.Provider value={pageData}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DataContext.Provider>
  )
}

renderInBrowser()
