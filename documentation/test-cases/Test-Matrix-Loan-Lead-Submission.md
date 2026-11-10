# Test Matrix: Online Lead Submission & Personal Details Validation

**Project:** Loan Origination Platform  
**QA Lead:** Yulia Agustin  
**Coverage:** UI Form, API Endpoints, Validation Rules, Boundary Checks  

---

| TC ID | Scenario Description | Test Type | Input Data / Preconditions | Expected Result | Priority | Automated |
|---|---|---|---|---|---|---|
| **TC-LEAD-001** | Submit valid personal detail form (Happy Path) | Functional (Positive) | Valid 16-digit NIK, Full Name, Valid Phone (0812...), Valid DOB (>21 yo) | Form succeeds, status 201 Created, Lead ID generated, RabbitMQ event dispatched | P1 - Critical | Yes (Playwright) |
| **TC-LEAD-002** | Submit NIK with invalid length (15 digits) | Boundary (Negative) | `NIK: 317101234567890` | Validation error: "NIK harus berjumlah 16 digit". Submit button disabled. | P1 - Critical | Yes (Playwright) |
| **TC-LEAD-003** | Submit NIK containing alphabetic characters | Validation (Negative) | `NIK: 317101234567890A` | Non-numeric input rejected immediately on keypress / schema validation fails | P2 - High | Yes (Playwright) |
| **TC-LEAD-004** | Applicant age under minimum legal threshold (<21 yo) | Business Logic | DOB indicating 19 years old | Field error: "Usia pemohon minimal 21 tahun". Form submission blocked. | P1 - Critical | Yes (API & UI) |
| **TC-LEAD-005** | Phone number format validation (Invalid prefix) | Validation (Negative) | Phone: `0711-234567` (landline format) | Error: "Nomor telepon harus berawalan 08 dan berupa nomor seluler". | P2 - High | Yes (Playwright) |
| **TC-LEAD-006** | Duplicate submission within 60 seconds (Idempotency) | Edge Case (Security) | User double clicks "Submit" rapidly or retries immediately | First request returns 201; second request returns 409 Conflict with clear toast message. No duplicate DB records. | P1 - Critical | Yes (Playwright API) |
| **TC-LEAD-007** | Upload ID image exceeding max size (>5MB) | Boundary (Negative) | JPG file size 7.2 MB | Client-side reject before upload: "Ukuran file foto KTP maksimal 5MB". | P2 - High | Yes (Playwright E2E) |
| **TC-LEAD-008** | Third-party OCR timeout simulation (HTTP 504) | Integration (Fault Tolerance) | Mock OCR endpoint returns 504 Gateway Timeout after 10s | Graceful fallback: User prompted to manually review extracted data; workflow does not crash. | P1 - Critical | Yes (Mock API) |
| **TC-LEAD-009** | XSS injection in "Address / Notes" field | Security (Negative) | Input: `<script>alert('XSS')</script>` | Content sanitized and rendered as plain text. No script execution in UI or DB. | P1 - Critical | Yes (Playwright API) |
| **TC-LEAD-010** | SQL Injection in Search / Filter parameter | Security (Negative) | Query param: `' OR '1'='1` | API returns parameterized sanitized search results or 400 Bad Request; no syntax exception. | P1 - Critical | Yes (API) |
