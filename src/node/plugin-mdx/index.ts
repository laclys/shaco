import { Plugin } from 'vite'
import { pluginMdxRollup } from './pluginMdxRollup'
import { pluginMdxHMR } from './plugin-mdx-hmr'

export async function createPluginMdx(): Promise<Plugin[]> {
  return [await pluginMdxRollup(), pluginMdxHMR()]
}
