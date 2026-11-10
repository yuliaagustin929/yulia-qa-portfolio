# Playwright E2E & API Test Automation Framework

This directory contains a TypeScript-based automated test suite combining **REST API Testing** (with JSON Schema contract assertions) and **Web UI E2E Testing** using the **Page Object Model (POM)** pattern.

## Tech Stack
- **Framework:** Playwright Test
- **Language:** TypeScript
- **Schema Validation:** AJV (Another JSON Schema Validator)
- **Design Pattern:** Page Object Model (POM)
- **Reporters:** Playwright HTML Report, List, CI JUnit

---

## Project Structure
```
playwright-api-e2e/
├── playwright.config.ts        # Central configuration (multi-browser, retries, baseURL)
├── tsconfig.json              # TypeScript compilation setup
├── package.json
└── tests/
    ├── api/
    │   └── lead-api.spec.ts   # REST API assertions & AJV contract schema tests
    └── e2e/
        ├── pages/
        │   └── LeadSubmissionPage.ts  # Encapsulated page locators & user actions
        └── lead-submission.spec.ts    # Positive, Negative & Dialog E2E scenarios
```

---

## How to Run

### 1. Install Dependencies
```bash
npm install
npx playwright install --with-deps
```

### 2. Run All Tests
```bash
npx playwright test
```

### 3. Run API Tests Only
```bash
npm run test:api
```

### 4. Run E2E Tests in Headed Mode
```bash
npm run test:headed
```

### 5. View Test Execution Report
```bash
npm run report
```

---

## Key Highlights
- **Schema Contract Testing:** Automatically verifies that backend response bodies conform to OpenAPI schemas using `ajv`, preventing breaking payload changes from reaching staging/production undetected.
- **Resilient Locators:** Adheres to Playwright best practices using user-facing roles and reliable data attributes instead of brittle absolute XPath locators.
- **Idempotency Header Testing:** Simulates `X-Idempotency-Key` headers to ensure endpoints prevent duplicate data entry on network retries.
