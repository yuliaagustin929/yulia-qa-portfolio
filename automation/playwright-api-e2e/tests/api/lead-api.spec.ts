import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true });

// JSON Schema definition for Lead Creation Response
const createLeadResponseSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    job: { type: 'string' },
    id: { type: 'string' },
    createdAt: { type: 'string' }
  },
  required: ['name', 'job', 'id', 'createdAt'],
  additionalProperties: true,
};

test.describe('Lead Submission & User API Suite', () => {

  test('POST /users - Successfully submit lead with valid payload @smoke @api', async ({ request }) => {
    const payload = {
      name: 'Yulia Agustin',
      job: 'QA Engineer',
      nik: '3171012345678901',
      loanAmount: 50000000,
      tenorMonths: 24,
    };

    const response = await request.post('/users', {
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        'X-Idempotency-Key': `idemp-${Date.now()}`,
      },
    });

    // 1. HTTP Status Check
    expect(response.status()).toBe(201);

    // 2. Response Headers
    expect(response.headers()['content-type']).toContain('application/json');

    // 3. Body assertions
    const responseBody = await response.json();
    expect(responseBody.name).toBe(payload.name);
    expect(responseBody.job).toBe(payload.job);
    expect(responseBody.id).toBeDefined();

    // 4. Contract Schema Validation using AJV
    const validate = ajv.compile(createLeadResponseSchema);
    const valid = validate(responseBody);
    if (!valid) {
      console.error('AJV Schema Validation Errors:', validate.errors);
    }
    expect(valid).toBeTruthy();
  });

  test('GET /users/2 - Fetch existing lead details and verify fields @api', async ({ request }) => {
    const response = await request.get('/users/2');

    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(body.data).toBeDefined();
    expect(body.data.id).toBe(2);
    expect(body.data.email).toContain('@');
    expect(typeof body.data.first_name).toBe('string');
  });

  test('GET /users/23 - Return 404 Not Found for non-existent lead ID @negative', async ({ request }) => {
    const response = await request.get('/users/23');
    expect(response.status()).toBe(404);
  });

  test('POST /login - Return 400 Bad Request with descriptive error on missing password @negative', async ({ request }) => {
    const response = await request.post('/login', {
      data: {
        email: 'peter@klaven',
        // password intentionally omitted
      },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBe('Missing password');
  });

  test('Response time SLA - Ensure endpoint responds within 1500ms @performance', async ({ request }) => {
    const startTime = Date.now();
    const response = await request.get('/users?page=1');
    const duration = Date.now() - startTime;

    expect(response.status()).toBe(200);
    expect(duration).toBeLessThan(1500);
  });
});
