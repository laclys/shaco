import pluginMdx from '@mdx-js/rollup'
import remarkPluginGFM from 'remark-gfm'
import rehypePluginAutolinkHeadings from 'rehype-autolink-headings'
import rehypePluginSlug from 'rehype-slug'
import remarkPluginMDXFrontMatter from 'remark-mdx-frontmatter'
import remarkPluginFrontmatter from 'remark-frontmatter'
import { rehypePluginPreWrapper } from './plugin-rehype/preWrapper'

export function pluginMdxRollup() {
  return pluginMdx({
    remarkPlugins: [
      remarkPluginGFM, // // GitHub flavored markdown ref: https://mdxjs.com/guides/gfm/
      remarkPluginFrontmatter,
      [remarkPluginMDXFrontMatter, { name: 'frontmatter' }] // remark-frontmatter remark-mdx-frontmatter  解析页面的元信息
    ],
    rehypePlugins: [
      rehypePluginSlug,
      [
        rehypePluginAutolinkHeadings,
        {
          properties: {
            class: 'header-anchor'
          },
          content: {
            type: 'text',
            value: '#'
          }
        }
      ],
      rehypePluginPreWrapper
    ] // rehype-autolink-headings rehype-slug 标题元素增加一个锚点
  })
}
