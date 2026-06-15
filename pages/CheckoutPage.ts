import { expect, Locator, Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly title: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;
  readonly cancelButton: Locator;

  // Checkout Step 2 (Overview) elements
  readonly finishButton: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  
  // Checkout Complete elements
  readonly completeHeader: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    
    // Overview
    this.finishButton = page.locator('[data-test="finish"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');

    // Complete
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async verifyIsOnCheckoutStepOne() {
    await expect(this.title).toHaveText('Checkout: Your Information');
    await expect(this.page).toHaveURL(/.*checkout-step-one.html/);
  }

  async fillInformation(firstName?: string, lastName?: string, postalCode?: string) {
    if (firstName !== undefined) await this.firstNameInput.fill(firstName);
    if (lastName !== undefined) await this.lastNameInput.fill(lastName);
    if (postalCode !== undefined) await this.postalCodeInput.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async verifyErrorMessage(expectedMessage: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(expectedMessage);
  }

  async verifyIsOnCheckoutStepTwo() {
    await expect(this.title).toHaveText('Checkout: Overview');
    await expect(this.page).toHaveURL(/.*checkout-step-two.html/);
  }

  async verifyTotalCalculation() {
    const subtotalText = await this.subtotalLabel.textContent();
    const taxText = await this.taxLabel.textContent();
    const totalText = await this.totalLabel.textContent();

    const subtotal = parseFloat(subtotalText?.replace('Item total: $', '') || '0');
    const tax = parseFloat(taxText?.replace('Tax: $', '') || '0');
    const total = parseFloat(totalText?.replace('Total: $', '') || '0');

    // Due to precision issues in JS, we round to 2 decimal places
    expect(Math.round((subtotal + tax) * 100) / 100).toBe(total);
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async verifyIsOnCheckoutComplete() {
    await expect(this.title).toHaveText('Checkout: Complete!');
    await expect(this.page).toHaveURL(/.*checkout-complete.html/);
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}
