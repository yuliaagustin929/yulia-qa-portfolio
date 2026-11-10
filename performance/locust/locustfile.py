import time
import random
from locust import HttpUser, task, between

class LeadSubmissionUser(HttpUser):
    """
    Simulates concurrent users browsing lead submission portals
    and submitting loan application payloads under load.
    """
    wait_time = between(1, 3)

    @task(3)
    def browse_homepage_and_form(self):
        """Simulate high-volume read traffic checking user/product endpoints."""
        with self.client.get("/users?page=1", catch_response=True) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"Unexpected status: {response.status_code}")

    @task(1)
    def submit_lead_application(self):
        """Simulate transactional write load (submitting applications)."""
        random_nik = f"3171{random.randint(100000000000, 999999999999)}"
        payload = {
            "name": f"Applicant_{random_nik[-4:]}",
            "job": "Software Engineer",
            "nik": random_nik,
            "amount": random.choice([25000000, 50000000, 100000000]),
            "tenor": random.choice([12, 24, 36])
        }
        headers = {
            "Content-Type": "application/json",
            "X-Idempotency-Key": f"idemp-{int(time.time() * 1000)}-{random_nik}"
        }

        with self.client.post("/users", json=payload, headers=headers, catch_response=True) as response:
            if response.status_code in [200, 201]:
                response.success()
            else:
                response.failure(f"Failed lead submission: HTTP {response.status_code}")
