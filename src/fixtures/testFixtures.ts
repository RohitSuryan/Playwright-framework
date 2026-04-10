import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ModalComponent } from '../components/ModalComponent';
import { ApiHelper } from '../utils/ApiHelper';
import { TestDataHelper } from '../utils/TestDataHelper';
import { AssertionHelper } from '../helpers/AssertionHelper';
import { WaitHelper } from '../helpers/WaitHelper';

/**
 * Custom test fixtures
 * Provides dependency injection for page objects and utilities
 */
type CustomFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  modalComponent: ModalComponent;
  apiHelper: ApiHelper;
  testDataHelper: TestDataHelper;
  assertionHelper: AssertionHelper;
  waitHelper: WaitHelper;
};

/**
 * Extend base test with custom fixtures
 */
export const test = base.extend<CustomFixtures>({
  /**
   * Login Page fixture
   */
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  /**
   * Home Page fixture
   */
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  /**
   * Modal Component fixture
   */
  modalComponent: async ({ page }, use) => {
    const modalComponent = new ModalComponent(page);
    await use(modalComponent);
  },

  /**
   * API Helper fixture
   */
  apiHelper: async ({ request }, use) => {
    const apiHelper = new ApiHelper(request);
    await use(apiHelper);
  },

  /**
   * Test Data Helper fixture (no setup needed, just pass the class)
   */
  testDataHelper: async ({}, use) => {
    await use(TestDataHelper);
  },

  /**
   * Assertion Helper fixture
   */
  assertionHelper: async ({}, use) => {
    const assertionHelper = new AssertionHelper();
    await use(assertionHelper);
  },

  /**
   * Wait Helper fixture
   */
  waitHelper: async ({ page }, use) => {
    const waitHelper = new WaitHelper(page);
    await use(waitHelper);
  },
});

export { expect } from '@playwright/test';
