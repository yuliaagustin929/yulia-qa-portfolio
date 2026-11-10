# QA Utilities & Test Data Generators

Reusable JavaScript/Node.js helper scripts to generate realistic, randomized test data for automation suites and manual testing.

## Included Helpers
- **`generateNik()`**: Generates realistic 16-digit Indonesian NIKs adhering to standard administrative area codes, date of birth, and female gender offset rules.
- **`generatePhoneNumber()`**: Generates valid Indonesian mobile phone numbers with standard provider prefixes (Telkomsel, Indosat, XL).
- **`generateLoanPayload()`**: Prepares complete, randomized application payloads with unique idempotency keys.

## Run Test Generation Demo
```bash
node test-data-generator.js
```
