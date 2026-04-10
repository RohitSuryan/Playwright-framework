import { Page, Locator, expect } from '@playwright/test';
import { Logger } from '../utils/Logger';

export class BasePage {
  protected page: Page;
  protected logger: Logger;

  constructor(page: Page) {
    this.page = page;
    this.logger = new Logger(this.constructor.name);
  }

  /**
   * Navigate to a specific URL
   */
  async navigateTo(url: string): Promise<void> {
    this.logger.info(`Navigating to: ${url}`);
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    //await this.waitForPageLoad();
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click on an element
   */
  async click(locator: Locator, options?: { force?: boolean }): Promise<void> {
    this.logger.info(`Clicking element: ${locator}`);
    await locator.click(options);
  }

  /**
   * Fill input field
   */
  async fill(locator: Locator, text: string): Promise<void> {
    this.logger.info(`Filling text: ${text}`);
    await locator.clear();
    await locator.fill(text);
  }

  /**
   * Type text with delay (simulates human typing)
   */
  async type(locator: Locator, text: string, delay: number = 100): Promise<void> {
    this.logger.info(`Typing text: ${text}`);
    await locator.pressSequentially(text, { delay });
  }

  /**
   * Get text from element
   */
  async getText(locator: Locator): Promise<string> {
    const text = await locator.textContent();
    this.logger.info(`Retrieved text: ${text}`);
    return text || '';
  }

  /**
   * Check if element is visible
   */
  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(locator: Locator, timeout: number = 30000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for element to be hidden
   */
  async waitForElementToHide(locator: Locator, timeout: number = 30000): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Select dropdown option by value
   */
  async selectDropdown(locator: Locator, value: string): Promise<void> {
    this.logger.info(`Selecting dropdown option: ${value}`);
    await locator.selectOption(value);
  }

  /**
   * Upload file
   */
  async uploadFile(locator: Locator, filePath: string): Promise<void> {
    this.logger.info(`Uploading file: ${filePath}`);
    await locator.setInputFiles(filePath);
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    this.logger.info(`Taking screenshot: ${name}`);
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  /**
   * Scroll to element
   */
  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Get current URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Press keyboard key
   */
  async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  /**
   * Wait for specific time
   */
  async wait(milliseconds: number): Promise<void> {
    await this.page.waitForTimeout(milliseconds);
  }

  /**
   * Hover over element
   */
  async hover(locator: Locator): Promise<void> {
    await locator.hover();
  }

  /**
   * Double click element
   */
  async doubleClick(locator: Locator): Promise<void> {
    await locator.dblclick();
  }

  /**
   * Right click element
   */
  async rightClick(locator: Locator): Promise<void> {
    await locator.click({ button: 'right' });
  }

  /**
   * Check checkbox
   */
  async check(locator: Locator): Promise<void> {
    await locator.check();
  }

  /**
   * Uncheck checkbox
   */
  async uncheck(locator: Locator): Promise<void> {
    await locator.uncheck();
  }

  /**
   * Get attribute value
   */
  async getAttribute(locator: Locator, attribute: string): Promise<string | null> {
    return await locator.getAttribute(attribute);
  }

  /**
   * Verify element contains text
   */
  async verifyElementContainsText(locator: Locator, expectedText: string): Promise<void> {
    await expect(locator).toContainText(expectedText);
  }

  /**
   * Verify element is visible
   */
  async verifyElementIsVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  /**
   * Verify element is hidden
   */
  async verifyElementIsHidden(locator: Locator): Promise<void> {
    await expect(locator).toBeHidden();
  }

  /**
   * Verify page URL
   */
  async verifyUrl(expectedUrl: string): Promise<void> {
    await expect(this.page).toHaveURL(expectedUrl);
  }

  /**
   * Verify page title
   */
  async verifyTitle(expectedTitle: string): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  /**
   * Execute JavaScript
   */
  async executeScript(script: string): Promise<any> {
    return await this.page.evaluate(script);
  }

  /**
   * Handle alert dialog
   */
  async handleAlert(action: 'accept' | 'dismiss', promptText?: string): Promise<void> {
    this.page.once('dialog', async dialog => {
      this.logger.info(`Alert detected: ${dialog.message()}`);
      if (action === 'accept') {
        await dialog.accept(promptText);
      } else {
        await dialog.dismiss();
      }
    });
  }

  /**
   * Switch to iframe
   */
  async switchToFrame(frameLocator: string): Promise<any> {
    return this.page.frameLocator(frameLocator);
  }

  /**
   * Reload page
   */
  async reload(): Promise<void> {
    await this.page.reload();
  }

  /**
   * Go back
   */
  async goBack(): Promise<void> {
    await this.page.goBack();
  }

  /**
   * Go forward
   */
  async goForward(): Promise<void> {
    await this.page.goForward();
  }
}
