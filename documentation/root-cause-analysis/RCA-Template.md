# Incident Post-Mortem & Root Cause Analysis (RCA) Template

## Incident Overview
- **Incident Number:** INC-[XXXX]
- **Incident Date:** YYYY-MM-DD
- **Severity / Priority:** P1 (Critical) / P2 (High) / P3 (Medium)
- **Service Impacted:** [Service / Application Name]
- **Detection Method:** [Monitoring Alert / Customer Report / Internal Staff]
- **Total Downtime / Disruption:** [e.g., 42 minutes]
- **QA Incident Lead:** [Name]
- **Engineering Lead:** [Name]

---

## 1. Description & Business Impact
*Briefly explain what went wrong from the user/business perspective.*
- **Symptoms:**
- **Users Affected:**
- **Financial / Operational Impact:**

---

## 2. Timeline of Events
All timestamps in [Local Timezone / UTC]:

| Time | Event Description | Action Taken |
|---|---|---|
| 00:00 | Issue detected / reported | Alert triggered in Slack |
| 00:10 | Incident response team assembled | Logs and metrics extracted |
| 00:25 | Root cause identified | Workaround / hotfix decided |
| 00:45 | Hotfix verified in Staging by QA | Staging smoke tests passed |
| 01:00 | Hotfix deployed to Production | Post-deploy smoke test passed |

---

## 3. Root Cause Analysis (5 Whys)
1. **Why did the failure occur?**
2. **Why?**
3. **Why?**
4. **Why?**
5. **Root Cause:**

---

## 4. Immediate Resolution (Hotfix)
*What code change, infrastructure change, or data patch resolved the issue immediately?*

---

## 5. Preventative Action Items & Test Coverage Guard
*Action items to ensure this failure mode cannot recur undetected.*

| Item # | Corrective Action | Type (Code / Infra / Test) | Owner | Due Date | Status |
|---|---|---|---|---|---|
| 1 | Automated regression test added | QA Automation | | | Open |
| 2 | Monitoring / Alert threshold adjusted | DevOps | | | Open |
| 3 | Core architecture refactor | Backend | | | Open |
