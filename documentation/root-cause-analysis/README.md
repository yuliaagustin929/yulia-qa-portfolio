# Production Incident & Root Cause Analysis (RCA)

This folder contains real-world incident investigation playbooks, Root Cause Analysis (RCA) documents, and post-mortem templates.

## Why this matters in QA
Senior QA Engineers don't just test features before release—they are critical frontline investigators during live production anomalies. They:
1. Quickly reproduce production issues in staging with exact payloads and logs.
2. Isolate whether defects originate in the client, API gateway, microservice business logic, event queue, or database.
3. Formulate the "5 Whys" and ensure a permanent automated regression test guard is implemented so the issue never recurs.

## Documents
- [`RCA-INC-2024-08-Message-Queue-Duplicate-Processing.md`](./RCA-INC-2024-08-Message-Queue-Duplicate-Processing.md) — Case study of an asynchronous message queue race condition causing duplicate order processing under high traffic.
- [`RCA-Template.md`](./RCA-Template.md) — Standardized engineering post-mortem template used across development and QA teams.
