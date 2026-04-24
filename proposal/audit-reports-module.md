# Audit — Reports Module Defects

**Prepared by:** Accenture
**Date:** April 24, 2026
**RFP #:** MC-2026-0417 — R1 Reports Module Remediation

---

## Summary

The Reports module has 9 documented defects. The primary user-visible issue — inconsistent filter behaviour — stems from the component bypassing the application's centralised filter and API systems entirely. All other views use `useFilters()` and `api.js`; the Reports page does not.

---

## Defects

### D01 — Hardcoded API calls bypass `api.js`
**Severity:** Critical
**File:** `client/src/views/ReportsView.vue` lines 156, 162

The component calls the backend directly using hardcoded URLs:
```js
axios.get('http://localhost:8001/api/reports/quarterly')
axios.get('http://localhost:8001/api/reports/monthly-trends')
```
Every other view uses the centralised `api.js` client. This means filter parameters are never attached to requests, the base URL is duplicated, and the component imports `axios` directly instead of through the API layer.

**Fix:** Add `getQuarterlyReports()` and `getMonthlyTrends()` to `client/src/api.js` and replace direct axios calls in the component.

---

### D02 — Backend report endpoints accept no filter parameters
**Severity:** Critical
**File:** `server/main.py` — `/api/reports/quarterly` and `/api/reports/monthly-trends`

Both report endpoints ignore all query parameters. Every other endpoint (`/api/orders`, `/api/inventory`, `/api/dashboard/summary`) accepts `warehouse`, `category`, and other filters. The report endpoints have no equivalent.

**Fix:** Add `warehouse` and `category` query params to both report endpoints and apply filtering before returning results.

---

### D03 — No `useFilters()` integration
**Severity:** Critical
**File:** `client/src/views/ReportsView.vue`

The global filter bar (Time Period, Warehouse, Category, Order Status) has no effect on the Reports page. The component does not import or use the `useFilters()` composable, so filter state changes are silently ignored.

**Fix:** Import `useFilters()`, watch for filter changes, and re-fetch data when filters update — matching the pattern used in all other views.

---

### D04 — All UI text hardcoded in English — no i18n
**Severity:** High
**File:** `client/src/views/ReportsView.vue` throughout template

All labels, headings, and status text are hardcoded strings. The application has a working `useI18n()` composable with English and Japanese locale files. The Reports module does not use it, so Tokyo warehouse staff see English-only content regardless of their language setting.

**Fix:** Import `useI18n()`, replace all hardcoded strings with `t('key')` calls, and add corresponding entries to `client/src/locales/en.js` and `client/src/locales/ja.js`.

---

### D05 — `formatNumber()` crashes on null/undefined input
**Severity:** High
**File:** `client/src/views/ReportsView.vue` line 217

```js
formatNumber(num) {
  var str = num.toString()  // crashes if num is null or undefined
```

If the API returns a missing or null field, calling `formatNumber()` on it throws an uncaught exception and breaks rendering for the entire component.

**Fix:** Add an input guard: `if (num == null || isNaN(num)) return '—'` before calling `.toString()`.

---

### D06 — `v-for` uses array index as `:key`
**Severity:** Medium
**File:** `client/src/views/ReportsView.vue` lines 28, 51, 82

```html
<tr v-for="(q, index) in quarterlyData" :key="index">
```

Using array index as a key causes Vue to reuse incorrect DOM elements when data is filtered or reordered. All other views use a unique field from the data object (e.g., `:key="order.id"`).

**Fix:** Use natural unique keys from the data — `:key="q.quarter"` and `:key="month.month"`.

---

### D07 — No empty state handling
**Severity:** Medium
**File:** `client/src/views/ReportsView.vue`

If the API returns an empty array (e.g., no data for the selected filters), the component renders a blank table with no message. Other views show explicit "no data" empty states.

**Fix:** Add `v-if` / `v-else` guards on data tables with a clear empty-state message.

---

### D08 — Excessive `console.log()` statements
**Severity:** Low
**File:** `client/src/views/ReportsView.vue` lines 145, 150, 155, 158, 161, 164, 167, 169, 172, 176, 215, 243, 256

Debug logging left in the component clutters the browser console during normal operation.

**Fix:** Remove all `console.log()` calls.

---

### D09 — Options API instead of Composition API
**Severity:** Low
**File:** `client/src/views/ReportsView.vue` lines 130–316

The entire component is written using the Vue Options API (`data()`, `methods:`, `mounted()`). Every other view in the application uses the Vue 3 Composition API with `<script setup>`. This is an incomplete migration from a prior codebase version.

**Fix:** Refactor to Composition API with `<script setup>` — consistent with `SpendingView.vue`, `OrdersView.vue`, `DashboardView.vue`, `DemandView.vue`, and `InventoryView.vue`.

---

## Resolution Status

| ID | Defect | Severity | Status |
|---|---|---|---|
| D01 | Hardcoded API calls bypass `api.js` | Critical | Resolved |
| D02 | Backend report endpoints accept no filter params | Critical | Resolved |
| D03 | No `useFilters()` integration | Critical | Resolved |
| D04 | All UI text hardcoded — no i18n | High | Resolved |
| D05 | `formatNumber()` crashes on null/undefined | High | Resolved |
| D06 | `v-for` uses array index as `:key` | Medium | Resolved |
| D07 | No empty state handling | Medium | Resolved |
| D08 | Excessive `console.log()` statements | Low | Resolved |
| D09 | Options API instead of Composition API | Low | Resolved |

---

*This document will be updated as defects are resolved. Final sign-off by Meridian IT upon all statuses reaching Resolved.*
