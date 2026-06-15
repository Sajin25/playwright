import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import testData from '../data/testData.json';

test.describe('Checkout Tests', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.users.standard.username, testData.users.standard.password);
    
    inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart(testData.products.backpack.id);
    await inventoryPage.navigateToCart();
    
    cartPage = new CartPage(page);
    await cartPage.proceedToCheckout();
    
    checkoutPage = new CheckoutPage(page);
    await checkoutPage.verifyIsOnCheckoutStepOne();
  });

  test('18. Checkout with missing First Name (negative)', async () => {
    await checkoutPage.fillInformation('', testData.checkoutInfo.lastName, testData.checkoutInfo.postalCode);
    await checkoutPage.continue();
    await checkoutPage.verifyErrorMessage('Error: First Name is required');
  });

  test('19. Checkout with missing Last Name (negative)', async () => {
    await checkoutPage.fillInformation(testData.checkoutInfo.firstName, '', testData.checkoutInfo.postalCode);
    await checkoutPage.continue();
    await checkoutPage.verifyErrorMessage('Error: Last Name is required');
  });

  test('20. Checkout with missing Postal Code (negative)', async () => {
    await checkoutPage.fillInformation(testData.checkoutInfo.firstName, testData.checkoutInfo.lastName, '');
    await checkoutPage.continue();
    await checkoutPage.verifyErrorMessage('Error: Postal Code is required');
  });

  test('21. Verify checkout overview (total price calculation)', async () => {
    await checkoutPage.fillInformation(testData.checkoutInfo.firstName, testData.checkoutInfo.lastName, testData.checkoutInfo.postalCode);
    await checkoutPage.continue();
    
    await checkoutPage.verifyIsOnCheckoutStepTwo();
    await checkoutPage.verifyTotalCalculation();
  });

  test('22. Complete checkout successfully (E2E flow)', async () => {
    await checkoutPage.fillInformation(testData.checkoutInfo.firstName, testData.checkoutInfo.lastName, testData.checkoutInfo.postalCode);
    await checkoutPage.continue();
    
    await checkoutPage.verifyIsOnCheckoutStepTwo();
    await checkoutPage.finishCheckout();
    
    await checkoutPage.verifyIsOnCheckoutComplete();
  });
});
