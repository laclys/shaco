import { Helmet } from 'react-helmet-async'
import { usePageData } from '@runtime'
import { Nav } from '../components/Nav'
import { HomeLayout } from './HomeLayout'
import { DocLayout } from './DocLayout'
import { NotFoundLayout } from './NotFound'

import '../styles/base.css'
import '../styles/vars.css'
import '../styles/doc.css'
import 'uno.css'

export function Layout() {
  const pageData = usePageData()
  const { pageType, title } = pageData

  const getContent = () => {
    if (pageType === 'home') {
      return <HomeLayout />
    } else if (pageType === 'doc') {
      return <DocLayout />
    } else {
      return <NotFoundLayout />
    }
  }
  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Nav />
      <section
        style={{
          paddingTop: 'var(--shaco-nav-height)'
        }}
      >
        {getContent()}
      </section>
    </div>
  )
}
