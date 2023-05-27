import cac from 'cac'
import { createDevServer } from './dev'
import { build } from './build'

const cli = cac('shaco').version('0.0.1').help()

cli.command('dev [root]', 'start dev server').action(async (root: string) => {
  const createServer = async () => {
    const { createDevServer } = await import('./dev.js')
    const server = await createDevServer(root, async () => {
      await server.close()
      await createServer()
    })
    await server.listen()
    server.printUrls()
  }
  await createServer()
})

cli.command('build [root]', 'build in prod').action(async (root: string) => {
  await build(root)
})

cli.parse()
