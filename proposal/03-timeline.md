# Timeline

**RFP #:** MC-2026-0417
**Section:** §4.4

---

We are proposing a six-week engagement beginning the week of May 11, 2026 (assuming vendor selection by May 9). The required items (R1–R4) are delivered by end of week four. Weeks five and six are reserved for desired items (D1–D3), contingent on required scope being accepted and stable.

The engagement opens with two parallel tracks: architecture review (R4) to orient the team, and test framework setup (R3) to establish a baseline before any changes are made. Reports remediation (R1) follows immediately, with the Restocking view (R2) beginning once R1 is stable.

```mermaid
gantt
    title Meridian Components — 6-Week Delivery Plan
    dateFormat YYYY-MM-DD
    axisFormat %b %d

    section Foundation
    Architecture review (R4)            :r4a, 2026-05-11, 4d
    Test framework + F1–F4 tests (R3)   :r3a, 2026-05-11, 7d

    section Reports Remediation (R1)
    Audit & defect log                  :r1a, 2026-05-15, 3d
    Remediation & sign-off              :r1b, after r1a, 7d

    section Restocking View (R2)
    Backend endpoint                    :r2a, after r1a, 5d
    Frontend view                       :r2b, after r2a, 7d
    F5 browser tests (R3)               :r3b, after r2b, 2d

    section Architecture Docs (R4)
    Final documentation & diagram       :r4b, after r2a, 4d

    section Desired Items (Weeks 5–6)
    D1 — UI modernization               :d1, 2026-06-08, 5d
    D2 — i18n extension                 :d2, 2026-06-08, 5d
    D3 — Dark mode                      :d3, 2026-06-15, 5d
    Final review & handoff              :milestone, 2026-06-19, 1d
```

---

## Milestones

| Milestone | Target date |
|---|---|
| Test baseline established (F1–F4) | May 22, 2026 |
| Reports module remediated (R1) | May 29, 2026 |
| Restocking view live (R2) | June 5, 2026 |
| Full browser test suite complete (R3 + F5) | June 9, 2026 |
| Architecture documentation delivered (R4) | June 9, 2026 |
| Required scope complete — IT sign-off checkpoint | June 9, 2026 |
| Desired items delivered (D1–D3) | June 19, 2026 |
| Engagement close & handoff | June 19, 2026 |

---

## Assumptions

- Engagement start date of May 11, 2026 assumes vendor selection no later than May 9.
- Meridian IT is available for a one-hour sign-off review at end of week four (June 5).
- Desired items scope (D1–D3) is confirmed at kickoff; material changes after week four may affect delivery.
- No dependency on Meridian systems beyond read access to the existing codebase and the ability to run the application locally.
