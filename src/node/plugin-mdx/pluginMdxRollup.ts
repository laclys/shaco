import pluginMdx from '@mdx-js/rollup'

export function pluginMdxRollup() {
  return [
    pluginMdx({
      remarkPlugins: [],
      rehypePlugins: []
    })
  ]
}
