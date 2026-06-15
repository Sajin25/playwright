import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import testData from '../data/testData.json';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('1. Successful login with standard user', async ({ page }) => {
    await loginPage.login(testData.users.standard.username, testData.users.standard.password);
    
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.verifyIsOnInventoryPage();
  });

  test('2. Failed login with incorrect password', async () => {
    await loginPage.login(testData.users.standard.username, 'wrong_password');
    await loginPage.verifyErrorMessage('Epic sadface: Username and password do not match any user in this service');
  });

  test('3. Failed login with locked out user', async () => {
    await loginPage.login(testData.users.lockedOut.username, testData.users.lockedOut.password);
    await loginPage.verifyErrorMessage('Epic sadface: Sorry, this user has been locked out.');
  });

  test('4. Failed login with empty username', async () => {
    await loginPage.login('', testData.users.standard.password);
    await loginPage.verifyErrorMessage('Epic sadface: Username is required');
  });

  test('5. Failed login with empty password', async () => {
    await loginPage.login(testData.users.standard.username, '');
    await loginPage.verifyErrorMessage('Epic sadface: Password is required');
  });
});
