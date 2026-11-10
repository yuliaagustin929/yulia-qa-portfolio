# Yulia Agustin — Senior QA Engineer Portfolio

[![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)](https://www.cypress.io/)
[![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white)](https://www.postman.com/)
[![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)](https://www.rabbitmq.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

> **Welcome to my Quality Assurance Portfolio.**  
> I am a **Senior QA Engineer** with 5 years of hands-on experience (**November 2021 – Present**) testing web applications, mobile platforms, and backend microservices. This repository showcases real-world examples of my work across **Test Automation**, **Manual Exploratory Testing**, **API Contract Testing**, **Performance Testing**, and **Production Incident Investigation (RCA)**.

---

## 👤 About Me
- **Experience:** 5 Years in Software Quality Assurance (Fintech, Multi-Finance, and Enterprise Platforms).
- **Core Strengths:**
  - **End-to-End Test Automation:** Designing maintainable, scalable automation suites using **Playwright** (TypeScript) and **Cypress**.
  - **API & Contract Testing:** Validating RESTful microservices, WebSocket events, and JSON Schema contracts with **AJV** and **Postman / Newman**.
  - **Production Incident Triage & RCA:** Frontline investigation of live production bugs, log inspection, root cause analysis (RCA), and off-hours hotfix verification under tight SLAs.
  - **Asynchronous Architecture QA:** Verifying message queues and event brokers (**RabbitMQ**, **NATS**), dead-letter queues, and message idempotency.
  - **Database Verification:** Direct querying across **MSSQL** and **PostgreSQL** to validate data consistency, sync batch jobs, and audit transactional records.
- **Location:** Jakarta, Indonesia
- **GitHub:** [@yuliaagustin929](https://github.com/yuliaagustin929)

---

## 🗂️ Portfolio Repository Structure

| Module | Directory | Description | Primary Tools |
|---|---|---|---|
| **Playwright Automation** | [`automation/playwright-api-e2e/`](./automation/playwright-api-e2e/) | Full TypeScript E2E (Page Object Model) and REST API test suite with AJV contract schema assertions. | Playwright, TypeScript, AJV |
| **Cypress Automation** | [`automation/cypress-tests/`](./automation/cypress-tests/) | Browser-based end-to-end tests for form actions and state assertions. | Cypress, JavaScript |
| **Selenium Tests** | [`automation/selenium-tests/`](./automation/selenium-tests/) | Python Selenium WebDriver tests with explicit waits and headless Chrome execution. | Python, Selenium WebDriver |
| **API Testing** | [`api-testing/postman-collections/`](./api-testing/postman-collections/) | Executable Postman collections with dynamic pre-request scripts, assertions, and Newman CLI runner. | Postman, Newman, REST |
| **Contract Testing** | [`api-testing/contract-testing/`](./api-testing/contract-testing/) | JSON Schema definitions and validator script to protect against breaking upstream changes. | AJV, JSON Schema Draft-07 |
| **Production RCA** | [`documentation/root-cause-analysis/`](./documentation/root-cause-analysis/) | Real-world P1 production incident post-mortem (RabbitMQ race condition) and RCA templates. | RCA, 5 Whys, Incident Triage |
| **Test Strategy & Plans** | [`documentation/test-plans/`](./documentation/test-plans/) | Master Test Plan for multi-channel loan origination and KYC biometrics verification. | Test Strategy, Risk Matrix |
| **Test Scenarios** | [`documentation/test-cases/`](./documentation/test-cases/) | Granular test matrices covering positive, negative, boundary, security, and edge-case scenarios. | Jira / Zephyr Scale Matrix |
| **Defect Reporting** | [`documentation/bug-reports/`](./documentation/bug-reports/) | Comprehensive Jira bug report template and high-severity defect case study with logs and HAR traces. | Jira, Server Logs |
| **Performance Testing** | [`performance/`](./performance/) | Load testing scripts simulating concurrent user traffic and SLA threshold enforcement. | Locust (Python), k6, JMeter |
| **Test Utilities** | [`utils/`](./utils/) | Dynamic test data generators for Indonesian 16-digit NIKs, mobile phone numbers, and loan payloads. | Node.js / JavaScript |

---

## 🔍 Featured Showcases

### 1. ⚙️ Playwright E2E & API Automation
Located at: [`automation/playwright-api-e2e/`](./automation/playwright-api-e2e/)
- **API Contract Verification:** Combines Playwright request fixtures with **AJV** to strictly validate JSON schema conformity before staging deployment.
- **Page Object Model (POM):** Encapsulates page elements, navigation, and user actions into clean, reusable class files (`LeadSubmissionPage.ts`).
- **Resilient Locators:** Implements user-facing locators that remain stable across frontend UI refactors.

### 2. 🚨 Production Incident Investigation & Root Cause Analysis (RCA)
Located at: [`documentation/root-cause-analysis/RCA-INC-2024-08-Message-Queue-Duplicate-Processing.md`](./documentation/root-cause-analysis/RCA-INC-2024-08-Message-Queue-Duplicate-Processing.md)
- Explains how a live P1 defect involving **duplicate lead creation in RabbitMQ** was diagnosed within 25 minutes.
- Demonstrates using **5 Whys methodology** to trace from database symptoms back to consumer connection pool exhaustion and lack of distributed locks.
- Shows how QA designed an automated regression test guard to prevent future regressions.

### 3. 📋 Comprehensive Test Planning & Documentation
Located at: [`documentation/test-plans/Master-Test-Plan-Fintech-Submission.md`](./documentation/test-plans/Master-Test-Plan-Fintech-Submission.md)
- Industry-grade test plan outlining feature scope, third-party KYC/OCR integrations, asynchronous queue testing, entry/exit criteria, and risk mitigation strategies.

---

## 🚀 Quick Start / How to Run

### Run Playwright Automation
```bash
cd automation/playwright-api-e2e
npm install
npx playwright install --with-deps
npm test
```

### Run Postman API Collection via CLI
```bash
cd api-testing/postman-collections
npx newman run Lead-Submission-API.postman_collection.json -e Test-Environment.postman_environment.json
```

### Run Performance Test with Locust
```bash
cd performance/locust
pip install locust
locust -f locustfile.py --host=https://reqres.in/api
```

### Generate Realistic Test Data (Indonesian NIK & Phone)
```bash
cd utils
node test-data-generator.js
```

---

## 📬 Contact
- **Name:** Yulia Agustin
- **Role:** Senior QA Engineer
- **GitHub:** [yuliaagustin929](https://github.com/yuliaagustin929)
- **Email:** [yuliaagustin929@gmail.com](mailto:yuliaagustin929@gmail.com)
