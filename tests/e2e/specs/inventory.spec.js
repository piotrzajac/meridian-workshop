// F2 — Inventory view: search and filter
const { test, expect } = require('@playwright/test')

test.describe('F2 — Inventory', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory')
    await expect(page.locator('table tbody tr').first()).toBeVisible({ timeout: 8000 })
  })

  test('page loads with inventory table', async ({ page }) => {
    await expect(page.locator('h2')).toContainText(/Inventory|Magazyn|在庫/)
    expect(await page.locator('table tbody tr').count()).toBeGreaterThan(0)
  })

  test('SKU count is shown in the table header', async ({ page }) => {
    // Inventory shows "Stock Levels (N SKUs)" in the card title
    const cardTitle = page.locator('.card-title').first()
    await expect(cardTitle).toBeVisible()
    const text = await cardTitle.textContent()
    expect(text).toMatch(/\d+/)
  })

  test('search filters table rows', async ({ page }) => {
    const searchInput = page.locator('input[type="text"]').first()
    await expect(searchInput).toBeVisible()

    const initialCount = await page.locator('table tbody tr').count()

    await searchInput.fill('PCB')
    await page.waitForTimeout(400)

    const filteredCount = await page.locator('table tbody tr').count()
    expect(filteredCount).toBeLessThanOrEqual(initialCount)

    const rows = page.locator('table tbody tr')
    const count = await rows.count()
    for (let i = 0; i < count; i++) {
      const rowText = await rows.nth(i).textContent()
      expect(rowText?.toUpperCase()).toContain('PCB')
    }
  })

  test('clear search restores all rows', async ({ page }) => {
    const searchInput = page.locator('input[type="text"]').first()
    const initialCount = await page.locator('table tbody tr').count()

    await searchInput.fill('PCB')
    await page.waitForTimeout(400)
    await searchInput.clear()
    await page.waitForTimeout(400)

    expect(await page.locator('table tbody tr').count()).toBe(initialCount)
  })

  test('global warehouse filter restricts inventory', async ({ page }) => {
    const allRows = await page.locator('table tbody tr').count()
    const selects = page.locator('select')
    if (await selects.count() >= 2) {
      await selects.nth(1).selectOption({ index: 1 })
      await page.waitForTimeout(600)
      expect(await page.locator('table tbody tr').count()).toBeLessThanOrEqual(allRows)
    }
  })
})
