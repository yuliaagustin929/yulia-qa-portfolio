# k6 Performance & Load Testing Suite

High-concurrency API performance test script using modern JavaScript on [k6](https://k6.io/).

## Features
- **3-Stage Load Profile:** Automatic ramp-up, steady-state soak, and ramp-down.
- **SLA Threshold Assertions:** Hard failure thresholds on `p(95) < 500ms` and `error_rate < 1%`.

## How to Run
```bash
# Run locally
k6 run load-test.js

# Run with custom virtual users
k6 run --vus 50 --duration 30s load-test.js
```
