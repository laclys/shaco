import { createRoot } from 'react-dom/client'
import { App, initPageData } from './App'
import { BrowserRouter } from 'react-router-dom'

import siteData from 'shaco:site-data'

function renderInBrowser() {
  console.log('siteData', siteData)
  const containerEl = document.getElementById('root')
  if (!containerEl) {
    throw new Error('#root element not found')
  }

  // init page data
  const pageData = initPageData(location.pathname)

  createRoot(containerEl).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

renderInBrowser()
