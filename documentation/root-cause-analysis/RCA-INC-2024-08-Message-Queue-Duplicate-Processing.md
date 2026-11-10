# Root Cause Analysis (RCA): Duplicate Lead Processing in Asynchronous Message Queue

| Field | Detail |
|---|---|
| **Incident ID** | INC-2024-0822 |
| **Severity** | P1 - High (Revenue & Customer Experience Impact) |
| **Date & Time** | 2024-08-22 14:15 WIB |
| **Affected Service** | Loan Lead Submission & Agent Distribution Service |
| **Primary QA Investigator** | Yulia Agustin |
| **Resolution Status** | Resolved & Guarded with Automation |

---

## 1. Executive Summary
During a nationwide marketing campaign surge, branch agents reported duplicate lead entries created for single applicant submissions. In total, 47 duplicate records were generated in the backend database within a 25-minute window, causing duplicate notification SMS dispatch and confusion in agent assignment.

The QA team isolated the issue within 25 minutes by comparing API Gateway ingress logs with RabbitMQ consumer logs, verifying that the issue stemmed from RabbitMQ consumer network timeouts triggering redeliveries without a distributed idempotency lock on the consumer service.

---

## 2. Incident Timeline (WIB)

- **14:15** — Customer Care and Branch Supervisors alert on Slack channel `#prod-issue-alerts` regarding duplicate leads.
- **14:22** — QA begins incident triage:
  - Extracted sample submission IDs from agent reports.
  - Queried MSSQL database for duplicate rows on `ApplicantNik` and `CreatedDate`.
  - Checked API Gateway access logs: confirmed only a **single** HTTP POST was submitted per applicant from the client.
- **14:35** — QA inspected RabbitMQ management console and consumer pod logs:
  - Discovered RabbitMQ redelivery flag (`redelivered: true`) for specific routing keys (`rk.lead.submitted`).
  - Found intermittent database connection pool exhaustion causing the consumer ACK to exceed the consumer timeout (30 seconds), causing RabbitMQ to requeue and redeliver the message to another consumer pod.
- **14:50** — Hotfix designed:
  - Implemented Redis distributed lock using `submission_uuid` as the idempotency key with a 10-minute TTL.
  - Increased DB connection pool and optimized consumer database write queries.
- **15:30** — QA executed emergency hotfix verification in Staging:
  - Simulated network lag and forced consumer redeliveries.
  - Verified that duplicated messages are dropped or acknowledged without re-inserting data.
- **16:05** — Hotfix deployed to Production. Zero duplicate entries recorded thereafter.

---

## 3. The 5 Whys (Root Cause Identification)

1. **Why were duplicate leads created in the database?**  
   Because the consumer service processed the same message twice.
2. **Why was the message processed twice?**  
   RabbitMQ redelivered the unacknowledged message to a secondary worker instance.
3. **Why was the message unacknowledged?**  
   The primary worker took 34 seconds to complete the transaction due to DB connection pool exhaustion, exceeding the 30-second ACK timeout.
4. **Why didn't the second worker detect that the message was already processing?**  
   The consumer lacked an idempotent check/distributed lock at the entry point of the message handler.
5. **Why wasn't this caught prior to production?**  
   Staging load tests had low concurrency and did not simulate high database latency paired with message queue redeliveries.

---

## 4. Preventative Actions & QA Safety Net

| Action Item | Owner | Target Date | Status |
|---|---|---|---|
| Implement Redis idempotency lock (`SETNX` key + TTL) in consumer service | Backend Team | 2024-08-22 | **Completed** |
| Write automated Playwright/API test simulating duplicate queue payload dispatch to verify idempotency | Yulia Agustin (QA) | 2024-08-24 | **Completed** |
| Add K6 load test script testing consumer queue under high database latency | Yulia Agustin (QA) | 2024-08-26 | **Completed** |
| Configure Datadog alert for `redelivered_messages_rate > 5/min` | DevOps Team | 2024-08-25 | **Completed** |
