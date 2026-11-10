import { test, expect } from '@playwright/test';
import { LeadSubmissionPage } from './pages/LeadSubmissionPage';

test.describe('E2E Lead Submission & Form Validation Flow', () => {
  let leadPage: LeadSubmissionPage;

  test.beforeEach(async ({ page }) => {
    leadPage = new LeadSubmissionPage(page);
    await leadPage.goto();
  });

  test('Verify page elements and title load correctly @smoke', async ({ page }) => {
    await expect(page).toHaveTitle(/Automation Exercise/);
    await expect(page.locator('h2:has-text("Get In Touch")')).toBeVisible();
  });

  test('Successfully submit form with valid fields and handle confirmation dialog @e2e', async () => {
    await leadPage.fillPersonalDetails({
      name: 'Yulia Agustin',
      email: 'yulia.qa.test@example.com',
      subject: 'Loan Inquiry - Vehicle Refinancing',
      message: 'Automated test execution: checking end-to-end form submission integrity.',
    });

    await leadPage.submitForm();
    await leadPage.verifySuccessAlert();
  });

  test('Form validation error on invalid email format @negative', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Invalid User');
    await page.locator('input[name="email"]').fill('invalid-email-without-at');
    await page.locator('input[name="subject"]').fill('Testing Negative Validation');
    await page.locator('textarea[name="message"]').fill('Sample message body.');

    await page.locator('input[name="submit"]').click();

    // Verify HTML5 validation or form blocked
    const emailInput = page.locator('input[name="email"]');
    const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.checkValidity());
    expect(isInvalid).toBe(true);
  });
});
