# Technical Approach

**RFP #:** MC-2026-0417
**Section:** §4.2

---

## R3 — Automated Browser Testing

We will establish the test framework at the start of the engagement — before making changes to any existing functionality. This gives your IT team a verified baseline and the confidence to approve changes as the work progresses.

We will use Playwright for end-to-end browser test coverage. Tests run against the live application and can be integrated into a CI pipeline.

We define "critical flows" as the following five categories, agreed with Meridian IT before testing begins:

| Flow | Scope |
|---|---|
| **F1 — Dashboard load** | Page renders with summary data; all three warehouses represented; no console errors |
| **F2 — Filter system** | Each of the four filters (Time Period, Warehouse, Category, Order Status) updates all dependent views correctly |
| **F3 — Reports module** | All report views load; filters work end-to-end; no missing data or broken i18n strings |
| **F4 — Orders & Inventory views** | Data loads per warehouse; status indicators display correctly |
| **F5 — Restocking view** | Budget input accepted; recommendations render; edge cases (zero stock, no budget) handled gracefully |

**Acceptance criteria (applied to each flow):**
- Page loads without JavaScript errors in the browser console
- All visible data fields are populated — no blank cards, no "undefined," no NaN
- Filters produce a non-empty, contextually correct result when valid inputs are applied
- Filters produce a clear empty-state message (not a broken layout) when no results match
- No network requests return 4xx or 5xx during normal operation

F1–F4 tests cover existing functionality and are written at engagement start. F5 (Restocking view) tests are added once R2 is delivered.

Tests will be organized one spec file per flow category. We will deliver a test run report your IT team can use as a formal sign-off checklist.

**Note:** The application already has a backend test suite covering all major API endpoints. We will not replace or modify these — the browser tests complement them, covering the frontend layer the existing tests do not reach.

---

## R1 — Reports Module Remediation

We will begin with a full audit of the Reports module — every view, every data binding, every filter interaction — before touching a single line of code. Meridian does not have a documented defect log; we will produce one as the first deliverable of this requirement, so your team has a complete picture of what was found and what was fixed.

The audit will cover:

- **Filter wiring.** The Reports page exposes the same four filters (Time Period, Warehouse, Category, Order Status) as the rest of the application. We will verify that each filter correctly drives the API query and that the rendered output updates accordingly. Where filters are disconnected or partially wired, we will complete the implementation.
- **Internationalization gaps.** The application already has an i18n system with English and Japanese translations. We will audit the Reports view for any hard-coded strings that bypass the translation layer and bring them into the existing system.
- **Data pattern inconsistencies.** We will normalize the Reports module to consistent Vue 3 Composition API patterns throughout.
- **API contract alignment.** We will verify that every field the Reports view expects from the backend is actually returned by the API, and that edge cases (empty result sets, missing data) render cleanly rather than producing blank cards or undefined values.

**Deliverable:** A fixed Reports module plus a written defect log documenting every issue found, its root cause, and the resolution. Your IT team can use this as a sign-off checklist.

---

## R2 — Restocking Recommendations View

The Restocking view is a new capability that translates raw inventory and demand data into actionable purchase order recommendations. The data required to drive this feature already exists in the application: inventory records include current stock levels and reorder thresholds per SKU, and demand forecasts include current demand, forecasted demand, and trend direction.

Our implementation approach:

- **Backend.** A new API endpoint will accept an optional budget ceiling parameter. It will identify items where current stock falls below the reorder point, rank them by demand urgency (items with increasing demand trends and deeper shortfalls ranked higher), and calculate recommended order quantities and estimated costs. Results are filtered to fit within the supplied budget ceiling.
- **Frontend.** A new view, consistent with the existing application design system, will present the recommendations as a sortable table. Operators will enter a budget ceiling; the view will update in real time. Each row will show SKU, item name, warehouse, current stock vs. reorder point, recommended order quantity, and estimated cost. Operators can adjust quantities before confirming.
- **Edge cases.** Zero-budget and no-shortfall states will render informative empty states rather than broken layouts.

**Assumption:** Demand forecast data is available via the existing API. We will not build a forecasting model — we will consume the forecast data already present in the system.

**Deliverable:** A fully functional Restocking view accessible from the main navigation, with a corresponding backend endpoint and passing browser tests.

---

## R4 — Architecture Documentation

We will conduct a live review of the codebase as it currently stands and produce a current-state architecture overview suitable for handoff to Meridian IT.

The documentation will cover:

- **Frontend layer:** Application structure, view inventory, component patterns, routing
- **Backend layer:** API endpoint inventory, filtering system, data models
- **Data layer:** Data storage approach, loading pattern, data shapes per domain
- **API contract:** All endpoints, accepted parameters, and response shapes
- **Cross-cutting concerns:** Filter system (how the four filters flow from the UI through the API), i18n system (how language switching works and where it applies)

The output will be an HTML document with a visual architecture diagram, delivered as a project artifact. Format is chosen for portability — no special tooling required to view or share it.

---

## D1–D3 — Desired Items (Weeks 5–6)

Time for the desired items is reserved in weeks five and six of the engagement, contingent on required scope (R1–R4) being stable by end of week four.

**D1 — UI Modernization.** The application uses a defined set of design tokens (colors, typography, spacing). We will refresh these tokens and update the component library to align with a more current visual standard. We will present two or three direction options for Meridian to choose from before implementing.

**D2 — Internationalization.** The i18n infrastructure (composable, locale files, language switcher) is already built and working for English and Japanese. The work here is extending it to views that currently bypass the translation layer. This is lower-risk than building i18n from scratch — the patterns are established, we are filling in coverage.

**D3 — Dark Mode.** An operator-selectable theme toggle that respects each user's preference across sessions. Particularly relevant for low-light warehouse floor stations. We will implement this as a CSS custom-property theme layer so it does not interfere with the existing light-mode design tokens.

---

*All assumptions in this section are listed explicitly. We will confirm or revise them at engagement kickoff before any work begins.*
