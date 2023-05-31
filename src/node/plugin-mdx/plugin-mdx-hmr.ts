import { Plugin } from 'vite'
import assert from 'assert'

export function pluginMdxHMR(): Plugin {
  let viteReactPlugin: Plugin
  return {
    name: 'vite-plugin-mdx-hmr',
    apply: 'serve', // 仅在开发阶段使用
    configResolved(config) {
      viteReactPlugin = config.plugins.find(
        (plugin) => plugin.name === 'vite:react-babel'
      ) as Plugin
    },
    async transform(code, id, opts) {
      if (/\.mdx?$/.test(id)) {
        // Inject babel refresh template code by @vitejs/plugin-react
        assert(typeof viteReactPlugin.transform === 'function')
        const result = await viteReactPlugin.transform?.call(
          this,
          code,
          id + '?.jsx',
          opts
        )
        const selfAcceptCode = 'import.meta.hot.accept();'
        if (
          typeof result === 'object' &&
          !result!.code?.includes(selfAcceptCode)
        ) {
          result!.code += selfAcceptCode
        }
        return result
      }
    }
  }
}
