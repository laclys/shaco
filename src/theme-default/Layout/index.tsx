import { usePageData } from '@runtime'
import { Nav } from '../components/Nav'
import { HomeLayout } from './HomeLayout'

import '../styles/base.css'
import '../styles/vars.css'
import 'uno.css'

export function Layout() {
  const pageData = usePageData()
  const { pageType } = pageData

  const getContent = () => {
    if (pageType === 'home') {
      return <HomeLayout />
    } else if (pageType === 'doc') {
      return <div>Doc</div>
    } else {
      return <div>404 page</div>
    }
  }
  return (
    <div>
      <Nav />
      {getContent()}
    </div>
  )
}
