import http from 'k6/http';
import { check, sleep } from 'k6';

// Test configuration: 3-stage load curve (Ramp-up, Plateau/Soak, Ramp-down)
export const options = {
  stages: [
    { duration: '30s', target: 20 }, // Ramp up to 20 virtual users
    { duration: '1m',  target: 20 }, // Stay at 20 virtual users for 1 min
    { duration: '30s', target: 0 },  // Ramp down to 0 users
  ],
  thresholds: {
    // 95% of requests must complete below 500ms
    http_req_duration: ['p(95)<500'],
    // Error rate must stay below 1%
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const url = 'https://reqres.in/api/users';
  const payload = JSON.stringify({
    name: 'Performance Test User',
    job: 'QA Engineer',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 201': (r) => r.status === 201,
    'response has id': (r) => JSON.parse(r.body).id !== undefined,
  });

  sleep(1);
}
