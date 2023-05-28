import { unified } from 'unified'
import { describe, test, expect } from 'vitest'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

describe('Markdown compile cases', () => {
  // 初始化 processor
  const processor = unified()
    .use(remarkParse) // 编译 Markdown 和 JSX  ref:https://github.com/gnab/remark
    .use(remarkRehype)
    .use(rehypeStringify) // 编译 HTML

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
})
