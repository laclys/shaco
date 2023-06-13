import { FC } from 'react'
import { usePageData } from '@runtime'
import { HomeHero } from '../../components/HomeHero'
import { HomeFeature } from '../../components/HomeFeature'

export const HomeLayout: FC = () => {
  const { frontmatter } = usePageData()

  return (
    <div>
      <HomeHero hero={frontmatter.hero} />
      <HomeFeature feature={frontmatter.features} />
    </div>
  )
}
