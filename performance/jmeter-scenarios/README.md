# Apache JMeter Test Plans

This folder contains Apache JMeter test plan configurations for enterprise load testing and API stress testing.

## Overview
- **Thread Groups:** 50 - 500 concurrent threads simulating peak traffic surges.
- **Listeners:** Aggregate Report, Summary Report, View Results Tree.
- **Assertions:** Response Code 200/201, Response Time Thresholds, JSON Path Extractors.

## How to Run via CLI (Non-GUI Mode)
```bash
jmeter -n -t Lead_Submission_Load_Plan.jmx -l results.jtl -e -o ./dashboard-report
```
