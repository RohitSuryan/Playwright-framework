import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { Config } from '../config/Config';

/**
 * Authenticated test fixtures
 * Provides a pre-authenticated page for tests that require login
 */
type AuthenticatedFixtures = {
  authenticatedPage: Page;
  homePage: HomePage;
};

/**
 * Extend base test with authenticated fixtures
 * Use this for tests that require a logged-in user
 */
export const authenticatedTest = base.extend<AuthenticatedFixtures>({
  /**
   * Authenticated page fixture
   * Automatically logs in before each test
   */
  authenticatedPage: async ({ page }, use) => {
    // Perform login
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.loginWithTestUser();
    
    // Wait for successful login (redirect to home page)
    await page.waitForLoadState('networkidle');
    
    // Use the authenticated page in tests
    await use(page);
    
    // Optional: Logout after test
    // const homePage = new HomePage(page);
    // await homePage.logout();
  },

  /**
   * Home Page fixture with pre-authentication
   */
  homePage: async ({ authenticatedPage }, use) => {
    const homePage = new HomePage(authenticatedPage);
    await use(homePage);
  },
});

export { expect } from '@playwright/test';
