# Postman API Testing & Newman CI Runner

This directory contains executable Postman collections with dynamic pre-request scripts, assertions, and environment variables.

## Key Features
- **Dynamic Data Generation:** Pre-request scripts dynamically generate unique timestamps, idempotency tokens, and valid NIK patterns.
- **Automated Assertions:** Tests verify HTTP status codes, response headers, performance thresholds (<800ms), and JSON body values.
- **Environment Driven:** Seamlessly switches between local, staging, and production base URLs.

## How to Run in CLI with Newman
You can run this collection directly from the command line using [Newman](https://github.com/postmanlabs/newman):

```bash
# Run with CLI output
npx newman run Lead-Submission-API.postman_collection.json \
  -e Test-Environment.postman_environment.json

# Run and generate rich HTML Extra Report
npx newman run Lead-Submission-API.postman_collection.json \
  -e Test-Environment.postman_environment.json \
  -r cli,htmlextra \
  --reporter-htmlextra-export ./newman-report.html
```
