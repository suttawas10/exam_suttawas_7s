import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { NokCashTopUpPage } from '../pages/nok-cash-top-up-page';
import { LoginPage } from '../pages/login-page';
import { PaymentPage } from '../pages/payment-page';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const email = 'email'
  const password = 'password'
  await page.goto('https://ลอตเตอรี่พลัส.com/');
  await homePage.acceptCookie()
  await homePage.goToLogIn()
  await loginPage.login(email,password)
});

test('Able go to payment page when input minimum amount', async ({ page }) => {
  const homePage = new HomePage(page);
  const nokCashTopUpPage = new NokCashTopUpPage(page);
  const paymentPage = new PaymentPage(page);
  const amount = 105
  await homePage.nokCashTopUp()
  await expect(nokCashTopUpPage.nokCashCardLocator).toBeVisible()
  await nokCashTopUpPage.inputAmountCash(amount)
  await nokCashTopUpPage.submitTopUp()
  await paymentPage.verifyPaymentDetail(amount)
});

test('Able to add amount with fixed amount button', async ({ page }) => {
  const homePage = new HomePage(page);
  const nokCashTopUpPage = new NokCashTopUpPage(page);
  const paymentPage = new PaymentPage(page);
  const amount = 315
  await homePage.nokCashTopUp();
  await expect(nokCashTopUpPage.nokCashCardLocator).toBeVisible();
  await nokCashTopUpPage.addFixedAmountCash(amount)
  await nokCashTopUpPage.submitTopUp()
  await paymentPage.verifyPaymentDetail(amount)
});

test('Able go to payment page when input maximum amount', async ({ page }) => {
  const homePage = new HomePage(page);
  const nokCashTopUpPage = new NokCashTopUpPage(page);
  const paymentPage = new PaymentPage(page);
  const amount = 2000000
  await homePage.nokCashTopUp()
  await expect(nokCashTopUpPage.nokCashCardLocator).toBeVisible()
  await nokCashTopUpPage.inputAmountCash(amount)
  await nokCashTopUpPage.submitTopUp()
  await paymentPage.verifyPaymentDetail(amount)
});

test('Not able to summit top-up when input amount less than minimum amount', async ({ page }) => {
  const homePage = new HomePage(page);
  const nokCashTopUpPage = new NokCashTopUpPage(page);
  const amount = 104
  await homePage.nokCashTopUp()
  await expect(nokCashTopUpPage.nokCashCardLocator).toBeVisible()
  await nokCashTopUpPage.inputAmountCash(amount)
  await expect(nokCashTopUpPage.nokCashTopUpSubmitLocator).toBeDisabled()
});

test('Able to cancel top-up then go to home page', async ({ page }) => {
  const homePage = new HomePage(page);
  const nokCashTopUpPage = new NokCashTopUpPage(page);
  const amount = 105
  await homePage.nokCashTopUp()
  await expect(nokCashTopUpPage.nokCashCardLocator).toBeVisible()
  await nokCashTopUpPage.inputAmountCash(amount)
  await nokCashTopUpPage.cancelTopUp()
  await expect(homePage.nokCashBannerLocator).toBeVisible()
});