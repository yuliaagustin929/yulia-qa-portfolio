# Jira Bug Reporting Standards & Production Bug Example

A great QA engineer writes bug reports that eliminate back-and-forth communication. Every report must have exact reproduction steps, payloads, logs, expected vs actual behavior, and environment details.

---

## 1. High-Severity Bug Report Example (Production / Staging)

**Issue Key:** LOS-4102  
**Summary:** [P1-Blocker] Duplicate Lead Record Created on Rapid Double Click on "Submit Application"  
**Issue Type:** Bug  
**Severity:** P1 - Critical  
**Priority:** High  
**Component:** Frontend-LeadForm, Backend-LeadService  
**Environment:** Staging v2.4.1 (Chrome 128 / macOS 15.0 & Mobile Safari iOS 18)  
**Reporter:** Yulia Agustin (Senior QA)  

### Description
When submitting the loan application form on Step 4 (Review & Submit), rapidly clicking the "Submit Application" button twice within 300ms causes two simultaneous POST requests to `/api/v1/leads/submit`. Because the button does not disable immediately upon first click and the backend lacks an idempotency key verification, two duplicate records are inserted into MSSQL `tbl_lead_submission` with different `lead_id`s but identical `nik` and `phone`.

### Steps to Reproduce:
1. Navigate to `/leads/new` and complete Steps 1–3 with valid test data.
2. Open Browser DevTools Network Tab (throttle to "Fast 3G" or simulate 200ms latency).
3. On Step 4, rapidly double-click the blue **"Submit Application"** button.
4. Observe the Network tab requests and check the database query below.

### SQL Verification Query:
```sql
SELECT lead_id, nik, full_name, created_at, status 
FROM tbl_lead_submission 
WHERE nik = '3171012345678901' 
ORDER BY created_at DESC;
```

### Expected Result:
1. Button should be disabled and show a loading spinner immediately upon first click to prevent client-side double submission.
2. The frontend must send an `Idempotency-Key: <uuid>` header.
3. The backend should return `409 Conflict` or return the existing submission if the same idempotency key is received within a 60-second window.
4. Exactly **1** record should exist in the database.

### Actual Result:
1. Button remains clickable for ~400ms before redirecting.
2. Both requests return `201 Created` with two distinct `lead_id`s (`LEAD-88491` and `LEAD-88492`).
3. Two separate RabbitMQ messages are published to `rk.lead.submitted`, triggering two duplicate agent notifications.

### Evidence & Attachments:
- **Network HAR file:** `double-submit-network-trace.har`
- **Video Recording:** `double-click-reproduce.mp4`
- **Server Log Snippet:**
  ```text
  [2024-08-20 10:14:22.104] [INFO] [LeadController] Incoming POST /api/v1/leads/submit | NIK=3171012345678901 | ReqID=a1b2
  [2024-08-20 10:14:22.288] [INFO] [LeadController] Incoming POST /api/v1/leads/submit | NIK=3171012345678901 | ReqID=c3d4
  [2024-08-20 10:14:22.450] [INFO] [LeadService] Inserted Lead ID LEAD-88491
  [2024-08-20 10:14:22.580] [INFO] [LeadService] Inserted Lead ID LEAD-88492
  ```

---

## 2. Standard Bug Report Template

```markdown
**Summary:** [Module/Component] Clear, concise description of the failure
**Issue Type:** Bug
**Severity:** P1 (Blocker) / P2 (Major) / P3 (Minor) / P4 (Trivial)
**Environment:** [Staging / Production URL, OS, Browser / Device Model, App Version]

### Description:
Brief context of where and why the issue occurs.

### Steps to Reproduce:
1. 
2. 
3. 

### Expected Result:
What the application should do according to business requirements.

### Actual Result:
What the application actually did (including error messages).

### Workaround (if any):
Temporary workaround for users or QA.

### Attachments & Evidence:
- Screenshots / Screen recordings
- API Request / Response JSON payloads
- Console error logs / Server log extracts
```
