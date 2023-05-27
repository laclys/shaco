import cac from 'cac'
import { build } from './build'
import { resolveConfig } from './config'

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
  const config = await resolveConfig(root, 'build', 'production')
  await build(root, config)
})

cli.parse()
