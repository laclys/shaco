import { FC } from 'react'
import { Feature } from 'shared/types'

export const HomeFeature: FC<{ features: Feature[] }> = ({ features }) => {
  const featuresLen = features.length
  let colNum = 3
  if (featuresLen < 6) {
    colNum = 2
  }
  if (featuresLen > 6 && !(featuresLen % 4)) {
    colNum = 4
  }
  return (
    <div className="max-w-1152px" m="auto" flex="~ wrap" justify="between">
      {features.map((f) => {
        const { icon, title, details } = f
        return (
          <div key={title} border="rounded-md" p="r-4 b-4" w="1/3">
            <article
              bg="bg-soft"
              border="~ bg-soft solid rounded-xl"
              p="6"
              h="full"
            >
              <div
                bg="gray-light-4 dark:bg-white"
                border="rounded-md"
                className="mb-5 w-12 h-12 text-3xl flex-center"
              >
                {icon}
              </div>
              <h2 font="bold">{title}</h2>
              <p text="sm text-2" font="medium" className="pt-2 leading-6">
                {details}
              </p>
            </article>
          </div>
        )
      })}
    </div>
  )
}
