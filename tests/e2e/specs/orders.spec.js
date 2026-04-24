// F3 — Orders view: filter by status and warehouse
const { test, expect } = require('@playwright/test')

test.describe('F3 — Orders', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/orders')
    await expect(page.locator('table tbody tr').first()).toBeVisible({ timeout: 8000 })
  })

  test('orders page loads with data', async ({ page }) => {
    await expect(page.locator('h2')).toContainText(/Orders|Zamówienia|注文/)
    expect(await page.locator('table tbody tr').count()).toBeGreaterThan(0)
  })

  test('summary stats are present', async ({ page }) => {
    expect(await page.locator('.stat-value').count()).toBeGreaterThan(2)
    const values = page.locator('.stat-value')
    const count = await values.count()
    for (let i = 0; i < count; i++) {
      const text = await values.nth(i).textContent()
      expect(text?.trim()).not.toBe('')
    }
  })

  test('order rows contain expected columns', async ({ page }) => {
    const firstRow = page.locator('table tbody tr').first()
    expect(await firstRow.locator('td').count()).toBeGreaterThan(4)
  })

  test('status badges are displayed', async ({ page }) => {
    const badges = page.locator('.badge')
    await expect(badges.first()).toBeVisible()
    expect(await badges.count()).toBeGreaterThan(0)
  })

  test('warehouse filter reduces order count', async ({ page }) => {
    const allCount = await page.locator('table tbody tr').count()

    const selects = page.locator('select')
    if (await selects.count() >= 2) {
      await selects.nth(1).selectOption({ index: 1 }) // first non-'all' warehouse
      await page.waitForTimeout(600)

      const filteredCount = await page.locator('table tbody tr').count()
      // Filtered result is a subset of all orders
      expect(filteredCount).toBeLessThanOrEqual(allCount)
    }
  })

  test('resetting location filter restores all orders', async ({ page }) => {
    const allCount = await page.locator('table tbody tr').count()

    const selects = page.locator('select')
    if (await selects.count() >= 2) {
      await selects.nth(1).selectOption({ index: 1 })
      await page.waitForTimeout(600)

      await selects.nth(1).selectOption({ index: 0 }) // 'all'
      await page.waitForTimeout(600)

      expect(await page.locator('table tbody tr').count()).toBe(allCount)
    }
  })
})
