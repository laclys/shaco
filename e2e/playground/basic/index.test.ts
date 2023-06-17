import { test, expect } from '@playwright/test'

const siteUrl = 'http://localhost:5173'

test('Verify that the page renders properly', async ({ page }) => {
  await page.goto(siteUrl)
  await page.waitForLoadState('networkidle') // 保证所有网络请求都得到相应
  const res = await page.evaluate(async () => {
    const pageContent = document.body.innerText
    return pageContent.includes('Hello')
  })
  expect(res).toBe(true)
})
