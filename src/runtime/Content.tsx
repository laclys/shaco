import { useRoutes } from 'react-router-dom'
import { routes } from 'shaco:routes'

export const Content = () => {
  console.log('routes', routes)
  const routeElement = useRoutes(routes)
  return routeElement
}
