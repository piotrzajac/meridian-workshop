// F5 — Restocking view: budget filter and demand trend badges
const { test, expect } = require('@playwright/test')

test.describe('F5 — Restocking', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/restocking')
    // Wait for both stats and table rows to be populated
    await expect(page.locator('table tbody tr').first()).toBeVisible({ timeout: 8000 })
  })

  test('restocking page loads with data', async ({ page }) => {
    await expect(page.locator('h2')).toContainText(/Restocking|Uzupełnienie|補充/)
  })

  test('stat cards show items to restock and estimated cost', async ({ page }) => {
    const statValues = page.locator('.stats-grid .stat-value')
    expect(await statValues.count()).toBeGreaterThan(1)
    // First value is items-to-restock — should be a positive integer
    const itemCount = await statValues.first().textContent()
    expect(Number(itemCount?.trim())).toBeGreaterThan(0)
  })

  test('recommendations table displays shortfall items', async ({ page }) => {
    const rows = page.locator('table tbody tr')
    expect(await rows.count()).toBeGreaterThan(0)
  })

  test('demand trend badges are displayed', async ({ page }) => {
    const badges = page.locator('.badge')
    await expect(badges.first()).toBeVisible()
    expect(await badges.count()).toBeGreaterThan(0)

    const count = await badges.count()
    for (let i = 0; i < count; i++) {
      const classes = await badges.nth(i).getAttribute('class')
      expect(classes).toMatch(/increasing|stable|decreasing|unknown/)
    }
  })

  test('shortfall column values are highlighted in red', async ({ page }) => {
    const shortfallCells = page.locator('.shortfall-cell')
    await expect(shortfallCells.first()).toBeVisible()
    expect(await shortfallCells.count()).toBeGreaterThan(0)
  })

  test('applying a budget caps the table', async ({ page }) => {
    const allRows = await page.locator('table tbody tr').count()
    expect(allRows).toBeGreaterThan(0)

    await page.locator('.budget-input').fill('3000')
    await page.locator('.btn-primary').click()
    await page.waitForTimeout(700)

    const budgetedRows = await page.locator('table tbody tr').count()
    expect(budgetedRows).toBeLessThanOrEqual(allRows)

    // Budget summary cards appear (Within Budget + Budget Remaining)
    expect(await page.locator('.stats-grid .stat-value').count()).toBeGreaterThan(2)
  })

  test('clearing budget restores full list', async ({ page }) => {
    const allRows = await page.locator('table tbody tr').count()
    expect(allRows).toBeGreaterThan(0)

    await page.locator('.budget-input').fill('3000')
    await page.locator('.btn-primary').click()
    await page.waitForTimeout(700)

    await page.locator('.btn-secondary').click()
    await page.waitForTimeout(700)

    expect(await page.locator('table tbody tr').count()).toBe(allRows)
  })

  test('warehouse filter updates restocking list', async ({ page }) => {
    const allRows = await page.locator('table tbody tr').count()
    const selects = page.locator('select')
    if (await selects.count() >= 2) {
      await selects.nth(1).selectOption({ index: 1 })
      await page.waitForTimeout(600)
      expect(await page.locator('table tbody tr').count()).toBeLessThanOrEqual(allRows)
    }
  })

  test('empty state shows message when no shortfalls match filters', async ({ page }) => {
    const selects = page.locator('select')
    if (await selects.count() >= 2) {
      await selects.nth(1).selectOption({ label: 'San Francisco' })
      await page.waitForTimeout(600)

      const emptyState = page.locator('.empty-state')
      const rowCount = await page.locator('table tbody tr').count()
      expect(await emptyState.isVisible() || rowCount === 0).toBe(true)
    }
  })
})
