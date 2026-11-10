import { Locator, Page, expect } from '@playwright/test';

/**
 * Page Object Model representing a Multi-Step Lead Submission / Registration Flow.
 */
export class LeadSubmissionPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly nikInput: Locator;
  readonly loanAmountInput: Locator;
  readonly termsCheckbox: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('input[name="fullName"], #name');
    this.emailInput = page.locator('input[name="email"], #email');
    this.phoneInput = page.locator('input[name="phone"], #phone');
    this.nikInput = page.locator('input[name="nik"], #nik');
    this.loanAmountInput = page.locator('input[name="loanAmount"], #amount');
    this.termsCheckbox = page.locator('input[type="checkbox"][name="terms"], #terms');
    this.submitButton = page.locator('button[type="submit"], #btn-submit');
    this.successMessage = page.locator('.alert-success, [data-testid="success-banner"]');
    this.errorMessage = page.locator('.alert-danger, .field-error, [data-testid="error-msg"]');
  }

  async goto() {
    await this.page.goto('https://automationexercise.com/contact_us');
  }

  async fillPersonalDetails(details: { name: string; email: string; subject: string; message: string }) {
    await this.page.locator('input[name="name"]').fill(details.name);
    await this.page.locator('input[name="email"]').fill(details.email);
    await this.page.locator('input[name="subject"]').fill(details.subject);
    await this.page.locator('textarea[name="message"]').fill(details.message);
  }

  async submitForm() {
    // Listen for dialog if browser alert is triggered
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await this.page.locator('input[name="submit"]').click();
  }

  async verifySuccessAlert() {
    const successBanner = this.page.locator('.status.alert-success');
    await expect(successBanner).toBeVisible();
    await expect(successBanner).toContainText('Success! Your details have been submitted successfully.');
  }
}
