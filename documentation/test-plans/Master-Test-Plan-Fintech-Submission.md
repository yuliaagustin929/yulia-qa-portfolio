# Master Test Plan: Multi-Channel Loan Lead Submission & Biometrics Verification

| Document Info | Value |
|---|---|
| **Author** | Yulia Agustin (Senior QA Engineer) |
| **Project / Feature** | Loan Origination System (LOS) - Online Lead Submission v2.4 |
| **Target Release** | Sprint 48 |
| **Status** | Approved |

---

## 1. Introduction & Objectives
This Master Test Plan outlines the end-to-end testing strategy for the enhanced online lead submission pipeline. The feature introduces real-time biometric liveness verification (KYC), automatic OCR extraction for Indonesian national ID (KTP), risk scoring integration, and asynchronous message dispatch to branch agent assignment queues.

### Primary Objectives:
- Ensure 100% data integrity from frontend submission to core banking / database storage.
- Guarantee that invalid or fraudulent biometrics/ID payloads are rejected with explicit user guidance.
- Verify zero regression across existing agent lead processing tools.
- Automate critical regression paths with Playwright (E2E & API) to achieve >80% automated coverage.

---

## 2. Scope of Testing

### 2.1 In-Scope
- **Functional Testing:** Multi-step web form validation, field boundary tests (NIK length, currency limits, phone formatting).
- **Third-Party Integrations:** OCR service, Biometric liveness API, Credit checking service.
- **Asynchronous Architecture:** RabbitMQ queue routing (`rk.lead.submitted`, `rk.lead.rejected`), message schema validation.
- **Data Integrity:** MSSQL transaction commit verification, duplicate submission prevention.
- **API Contract Validation:** Request/Response schema validation with AJV against OpenAPI 3.0 spec.
- **Cross-Browser & Responsive:** Chrome, Firefox, Safari (desktop) and mobile Safari / Chrome on Android.

### 2.2 Out-of-Scope
- Physical biometric hardware testing (mobile camera resolution limits).
- Third-party banking ledger settlement (verified via sandbox mocks).

---

## 3. Test Strategy & Levels

```
                   +------------------------+
                   |  E2E UI Tests (10%)    | -> Playwright Web Tests
                   +------------------------+
                +------------------------------+
                |  API & Contract Tests (40%)  | -> Playwright API / Postman / AJV
                +------------------------------+
             +------------------------------------+
             |  Integration & Queue Tests (30%)   | -> RabbitMQ, DB State, Mocks
             +------------------------------------+
          +------------------------------------------+
          |  Manual Exploratory & Edge Cases (20%)   | -> Session-based exploratory
          +------------------------------------------+
```

1. **API Testing:** Executed first using Postman and automated Playwright API suites. Focuses on status codes, payload contracts, authentication tokens, rate limits, and error message consistency.
2. **Event Queue & Database Testing:** Direct verification of database rows via SQL scripts and listening to RabbitMQ exchanges to ensure events trigger with correct headers and routing keys.
3. **UI / E2E Automation:** Playwright Page Object Model (POM) tests automating happy path submissions and critical validation error states.
4. **Manual Exploratory Testing:** Dedicated exploratory sessions focused on race conditions (e.g. double-clicking submit button, network loss mid-upload, browser back-navigation).

---

## 4. Entry and Exit Criteria

### Entry Criteria:
- Feature branch merged to Staging environment.
- OpenAPI specification reviewed and locked.
- Unit test coverage reported >75% by development team.
- Test data (valid test NIKs, test ID images) generated and accessible.

### Exit Criteria:
- 100% of planned test cases executed.
- 0 Critical (P1) or Major (P2) open defects.
- All automated regression test suites green on CI/CD pipeline.
- Production smoke test plan signed off by QA and Product Owner.

---

## 5. Risk Assessment & Mitigation

| Risk | Likelihood | Impact | Mitigation Strategy |
|---|---|---|---|
| Third-party KYC / OCR vendor API outage during testing | High | Medium | Implemented WireMock service stubs for deterministic testing of success, failure, and timeout responses. |
| RabbitMQ message drops during peak submission load | Medium | High | Created synthetic load test using Locust/K6 and automated consumer verification scripts. |
| Mobile camera file uploads causing memory leaks on low-end devices | Medium | High | Conducted responsive testing across varied viewport sizes and throttled 3G network conditions. |
