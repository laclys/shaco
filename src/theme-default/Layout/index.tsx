import { usePageData } from '@runtime'
import 'uno.css'

export function Layout() {
  const pageData = usePageData()
  const { pageType } = pageData

  const getContent = () => {
    if (pageType === 'home') {
      return <div>Home</div>
    } else if (pageType === 'doc') {
      return <div>Doc</div>
    } else {
      return <div>404 page</div>
    }
  }
  return <div>{getContent()}</div>
}
