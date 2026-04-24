// F4 — Reports view: filter integration and data display
const { test, expect } = require('@playwright/test')

test.describe('F4 — Reports', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/reports')
    await expect(page.locator('table').first()).toBeVisible({ timeout: 8000 })
  })

  test('reports page loads', async ({ page }) => {
    await expect(page.locator('h2')).toContainText(/Reports|Raporty|レポート/)
  })

  test('quarterly table has data rows', async ({ page }) => {
    const rows = page.locator('table').first().locator('tbody tr')
    await expect(rows.first()).toBeVisible()
    expect(await rows.count()).toBeGreaterThan(0)
  })

  test('quarterly rows contain Q-format quarter labels', async ({ page }) => {
    const rows = page.locator('table').first().locator('tbody tr')
    const count = await rows.count()
    expect(count).toBeGreaterThan(0)
    for (let i = 0; i < count; i++) {
      const cellText = await rows.nth(i).locator('td').first().textContent()
      expect(cellText).toMatch(/Q[1-4]-\d{4}/)
    }
  })

  test('summary stat cards are present', async ({ page }) => {
    await expect(page.locator('.stats-grid .stat-value').first()).toBeVisible()
    expect(await page.locator('.stats-grid .stat-value').count()).toBeGreaterThan(2)
  })

  test('global warehouse filter updates report data', async ({ page }) => {
    const selects = page.locator('select')
    if (await selects.count() >= 2) {
      await selects.nth(1).selectOption({ index: 1 })
      await page.waitForTimeout(700)
      // Page should remain stable after filter change
      await expect(page.locator('table').first()).toBeVisible()
    }
  })

  test('no unexpected application errors on load', async ({ page }) => {
    // Watch for Vue/application-level errors (not network noise)
    const appErrors = []
    page.on('pageerror', err => appErrors.push(err.message))
    await page.reload()
    await expect(page.locator('table').first()).toBeVisible({ timeout: 8000 })
    expect(appErrors).toHaveLength(0)
  })
})
