import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Config } from '../config/Config';

/**
 * Login Page Object
 * Contains all elements and methods specific to the login page
 */
export class LoginPage extends BasePage {
  // Locators
  private readonly emailInput: Locator;
  private readonly continueButton: Locator;
  private readonly domainInput: Locator;
  private readonly passwordInput: Locator;
  private readonly signinButton: Locator;

  private readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators
    this.emailInput = page.locator('input[name="email"]');
    this.continueButton = page.locator('button[type="submit"], button:has-text("Continue"), button:has-text("Next")');
    this.domainInput = page.locator('input[name="domainsList"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.signinButton = page.locator('button[type="submit"], button:has-text("Sign in")');
    this.pageTitle = page.locator('h1, h2, .page-title');
  }

  /**
   * Navigate to login page
   */
  async navigateToLoginPage(): Promise<void> {
    this.logger.info('Navigating to login page');
    await this.navigateTo('/'); // Assuming baseURL is set to the application URL
  }

  /**
   * Login with credentials
   */
  async login(email: string, domain: string, password: string): Promise<void> {
    this.logger.info(`Logging in with email: ${email} and domain: ${domain}`);
    await this.fill(this.emailInput, email);
    await this.click(this.continueButton);
    await this.waitForElement(this.domainInput);
    await this.fill(this.domainInput, domain);
    await this.click(this.continueButton);
    await this.waitForElement(this.passwordInput);
    await this.fill(this.passwordInput, password);
    await this.click(this.signinButton);
    await this.waitForPageLoad();
  }

  /**
   * Login with test user from config
   */
  async loginWithTestUser(): Promise<void> {
    const testUser = Config.username;
    const testDomain = Config.domain;
    const testPassword = Config.password;
    await this.login(testUser, testDomain, testPassword);
  }

  /**
   * Enter email
   */
  async enterEmail(email: string): Promise<void> {
    await this.fill(this.emailInput, email);
  }

  /**
   * Enter password
   */
  async enterPassword(password: string): Promise<void> {
    await this.fill(this.passwordInput, password);
  }

  /**
   * Click sign in button
   */
  async clickSignInButton(): Promise<void> {
    await this.click(this.signinButton);
  }

  /**
   * Verify page title
   */
  async verifyPageTitle(expectedTitle: string): Promise<void> {
    await this.verifyElementContainsText(this.pageTitle, expectedTitle);
  }
}
