# Locust Performance Testing

Load test suite written in Python using [Locust](https://locust.io/).

## How to Run

```bash
# Install Locust
pip install locust

# Run with interactive web UI (at http://localhost:8089)
locust -f locustfile.py --host=https://reqres.in/api

# Run headless in CI/CD mode (e.g. 50 users, spawn rate 5, duration 1m)
locust -f locustfile.py --headless -u 50 -r 5 --run-time 1m --host=https://reqres.in/api
```
