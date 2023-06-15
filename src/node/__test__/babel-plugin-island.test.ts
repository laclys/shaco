import { describe, test, expect } from 'vitest'
import babelPluginIsland from '../babel-plugin-island'
import { TransformOptions, transformAsync } from '@babel/core'
import { MASK_SPLITTER } from '../../node/constants'

describe('babel-plugin-island', () => {
  const ISLAND_PATH = '../Comp/index'

  const IMPORTER_PATH = '/Users/lac/Desktop/shaco/User/project/test.tsx'

  const babelOpts: TransformOptions = {
    filename: IMPORTER_PATH,
    presets: ['@babel/preset-react'],
    plugins: [babelPluginIsland]
  }

  test('Should compile jsx identifier', async () => {
    const code = `import Aside from '${ISLAND_PATH}'; export default function App() { return <Aside __island />; }`

    const result = await transformAsync(code, babelOpts)

    expect(result?.code).toContain(
      `__island: "${ISLAND_PATH}${MASK_SPLITTER}${IMPORTER_PATH}"`
    )
  })

  test('Should compile jsx member expression', async () => {
    const code = `import A from '${ISLAND_PATH}'; export default function App() { return <A.B __island />; }`

    const result = await transformAsync(code, babelOpts)

    expect(result?.code).toContain(
      `__island: "${ISLAND_PATH}${MASK_SPLITTER}${IMPORTER_PATH}"`
    )
  })
})
