import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import testData from '../data/testData.json';

test.describe('Inventory Tests', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.users.standard.username, testData.users.standard.password);
    
    inventoryPage = new InventoryPage(page);
    await inventoryPage.verifyIsOnInventoryPage();
  });

  test('6. Verify all products are displayed', async () => {
    const productNames = await inventoryPage.getProductNames();
    expect(productNames.length).toBe(6);
    expect(productNames).toContain(testData.products.backpack.name);
    expect(productNames).toContain(testData.products.bikeLight.name);
  });

  test('7. Sort products Name (A to Z)', async () => {
    await inventoryPage.sortProducts('az');
    const productNames = await inventoryPage.getProductNames();
    const sortedNames = [...productNames].sort();
    expect(productNames).toEqual(sortedNames);
  });

  test('8. Sort products Name (Z to A)', async () => {
    await inventoryPage.sortProducts('za');
    const productNames = await inventoryPage.getProductNames();
    const sortedNames = [...productNames].sort().reverse();
    expect(productNames).toEqual(sortedNames);
  });

  test('9. Sort products Price (low to high)', async () => {
    await inventoryPage.sortProducts('lohi');
    const productPrices = await inventoryPage.getProductPrices();
    const sortedPrices = [...productPrices].sort((a, b) => a - b);
    expect(productPrices).toEqual(sortedPrices);
  });

  test('10. Sort products Price (high to low)', async () => {
    await inventoryPage.sortProducts('hilo');
    const productPrices = await inventoryPage.getProductPrices();
    const sortedPrices = [...productPrices].sort((a, b) => b - a);
    expect(productPrices).toEqual(sortedPrices);
  });

  test('11. Add a single item to cart and verify badge', async () => {
    await inventoryPage.addItemToCart(testData.products.backpack.id);
    await inventoryPage.verifyCartBadgeCount('1');
  });

  test('12. Add multiple items to cart', async () => {
    await inventoryPage.addItemToCart(testData.products.backpack.id);
    await inventoryPage.addItemToCart(testData.products.bikeLight.id);
    await inventoryPage.verifyCartBadgeCount('2');
  });

  test('13. Remove an item from the cart from the inventory page', async () => {
    await inventoryPage.addItemToCart(testData.products.backpack.id);
    await inventoryPage.verifyCartBadgeCount('1');
    
    await inventoryPage.removeItemFromCart(testData.products.backpack.id);
    await inventoryPage.verifyCartBadgeCount('0');
  });
});
