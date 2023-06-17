import { unified } from 'unified'
import shiki from 'shiki'
import { describe, test, expect } from 'vitest'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import remarkMdx from 'remark-mdx'
import remarkStringify from 'remark-stringify'
import { rehypePluginPreWrapper } from '../plugin-mdx/plugin-rehype/preWrapper'
import { rehypePluginShiki } from '../plugin-mdx/plugin-rehype/shiki'
import { remarkPluginToc } from '../plugin-mdx/plugin-remark/toc'

describe('Markdown compile cases', async () => {
  // 初始化 processor
  const processor = unified()
    .use(remarkParse) // 编译 Markdown 和 JSX  ref:https://github.com/gnab/remark
    .use(remarkRehype)
    .use(rehypeStringify) // 编译 HTML
    .use(rehypePluginPreWrapper)
    .use(rehypePluginShiki, {
      highlighter: await shiki.getHighlighter({
        theme: 'nord'
      })
    })

  test('Compile title', async () => {
    const mdContent = '# 123'
    const result = processor.processSync(mdContent)
    expect(result.value).toMatchInlineSnapshot('"<h1>123</h1>"')
  })

  test('Compile code', async () => {
    const mdContent = 'I am using `Shaco!`'
    const result = processor.processSync(mdContent)
    expect(result.value).toMatchInlineSnapshot(
      '"<p>I am using <code>Shaco!</code></p>"'
    )
  })

  test('Compile code block', async () => {
    const mdContent = '```js\nconsole.log(123);\n```'
    const result = processor.processSync(mdContent)
    expect(result.value).toMatchInlineSnapshot(`
      "<div class=\\"language-js\\"><span class=\\"lang\\">js</span><pre class=\\"shiki nord\\" style=\\"background-color: #2e3440ff\\" tabindex=\\"0\\"><code><span class=\\"line\\"><span style=\\"color: #D8DEE9\\">console</span><span style=\\"color: #ECEFF4\\">.</span><span style=\\"color: #88C0D0\\">log</span><span style=\\"color: #D8DEE9FF\\">(</span><span style=\\"color: #B48EAD\\">123</span><span style=\\"color: #D8DEE9FF\\">)</span><span style=\\"color: #81A1C1\\">;</span></span>
      <span class=\\"line\\"></span></code></pre></div>"
    `)
  })

  test('Compile TOC', async () => {
    const remarkProcessor = unified()
      .use(remarkParse)
      .use(remarkMdx)
      .use(remarkPluginToc)
      .use(remarkStringify)

    const mdContent = `
    
      # h1 lac

      ## h2 \`code\`

      ### h3 [link](https://ssss.dev)

      #### h4

      ##### h5
`

    const result = remarkProcessor.processSync(mdContent)
    expect(result.value.toString().replace(mdContent, ''))
      .toMatchInlineSnapshot(`
        "# h1 lac

        ## h2 \`code\`

        ### h3 [link](https://ssss.dev)

        #### h4

        ##### h5

        export const toc = [
          {
            \\"id\\": \\"h2-code\\",
            \\"text\\": \\"h2 code\\",
            \\"depth\\": 2
          },
          {
            \\"id\\": \\"h3-link\\",
            \\"text\\": \\"h3 link\\",
            \\"depth\\": 3
          },
          {
            \\"id\\": \\"h4\\",
            \\"text\\": \\"h4\\",
            \\"depth\\": 4
          }
        ];

        export const title = 'h1 lac';
        "
      `)
  })
})
