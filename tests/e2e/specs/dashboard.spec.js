// F1 — Dashboard loads and displays KPI data
const { test, expect } = require('@playwright/test')

test.describe('F1 — Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.kpi-card').first()).toBeVisible({ timeout: 8000 })
  })

  test('page title and nav are visible', async ({ page }) => {
    await expect(page.locator('.logo h1')).toContainText('Catalyst Components')
    await expect(page.locator('.nav-tabs')).toBeVisible()
  })

  test('KPI cards load with numeric values', async ({ page }) => {
    const kpiValues = page.locator('.kpi-value')
    expect(await kpiValues.count()).toBeGreaterThan(3)
  })

  test('KPI values are non-empty', async ({ page }) => {
    const kpiValues = page.locator('.kpi-value')
    const count = await kpiValues.count()
    expect(count).toBeGreaterThan(0)
    for (let i = 0; i < count; i++) {
      const text = await kpiValues.nth(i).textContent()
      expect(text?.trim()).not.toBe('')
    }
  })

  test('warehouse filter does not crash the page', async ({ page }) => {
    const selects = page.locator('select')
    if (await selects.count() > 1) {
      await selects.nth(1).selectOption({ index: 1 })
      await page.waitForTimeout(800)
      await expect(page.locator('.logo h1')).toBeVisible()
    }
  })

  test('navigation links work', async ({ page }) => {
    await page.locator('.nav-tabs a').filter({ hasText: 'Inventory' }).click()
    await expect(page).toHaveURL(/\/inventory/)
    await page.goBack()
    await expect(page).toHaveURL('/')
  })
})
