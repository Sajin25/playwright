import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly sortDropdown: Locator;
  readonly inventoryItems: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async verifyIsOnInventoryPage() {
    await expect(this.title).toHaveText('Products');
    await expect(this.page).toHaveURL(/.*inventory.html/);
  }

  async sortProducts(sortOption: string) {
    await this.sortDropdown.selectOption(sortOption);
  }

  async addItemToCart(productId: string) {
    await this.page.locator(`[data-test="${productId}"]`).click();
  }

  async removeItemFromCart(productId: string) {
    // The remove button uses the same id format but starts with remove- instead of add-to-cart-
    const removeId = productId.replace('add-to-cart-', 'remove-');
    await this.page.locator(`[data-test="${removeId}"]`).click();
  }

  async verifyCartBadgeCount(count: string) {
    if (count === '0') {
      await expect(this.cartBadge).not.toBeVisible();
    } else {
      await expect(this.cartBadge).toHaveText(count);
    }
  }

  async navigateToCart() {
    await this.cartLink.click();
  }

  async getProductPrices(): Promise<number[]> {
    const pricesText = await this.page.locator('.inventory_item_price').allTextContents();
    return pricesText.map(price => parseFloat(price.replace('$', '')));
  }

  async getProductNames(): Promise<string[]> {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }
}
