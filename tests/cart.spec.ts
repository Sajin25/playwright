import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import testData from '../data/testData.json';

test.describe('Cart Tests', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.users.standard.username, testData.users.standard.password);
    
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
  });

  test('14. Verify items added to cart are displayed correctly', async () => {
    await inventoryPage.addItemToCart(testData.products.backpack.id);
    await inventoryPage.addItemToCart(testData.products.bikeLight.id);
    await inventoryPage.navigateToCart();
    
    await cartPage.verifyIsOnCartPage();
    await cartPage.verifyCartItemCount(2);
  });

  test('15. Remove an item directly from the cart page', async () => {
    await inventoryPage.addItemToCart(testData.products.backpack.id);
    await inventoryPage.navigateToCart();
    
    await cartPage.verifyIsOnCartPage();
    await cartPage.verifyCartItemCount(1);
    
    await cartPage.removeCartItem(testData.products.backpack.id);
    await cartPage.verifyCartItemCount(0);
  });

  test('16. Continue shopping from the cart page', async () => {
    await inventoryPage.navigateToCart();
    await cartPage.verifyIsOnCartPage();
    
    await cartPage.continueShopping();
    await inventoryPage.verifyIsOnInventoryPage();
  });

  test('17. Navigate to checkout from the cart page', async () => {
    await inventoryPage.addItemToCart(testData.products.backpack.id);
    await inventoryPage.navigateToCart();
    
    await cartPage.verifyIsOnCartPage();
    await cartPage.proceedToCheckout();
    
    await expect(cartPage.page).toHaveURL(/.*checkout-step-one.html/);
  });
});
