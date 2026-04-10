import { Page, Locator } from '@playwright/test';
import { Logger } from '../utils/Logger';

/**
 * Wait Helper
 * Provides various wait strategies for test stability
 */
export class WaitHelper {
  private page: Page;
  private logger: Logger;

  constructor(page: Page) {
    this.page = page;
    this.logger = new Logger('WaitHelper');
  }

  /**
   * Wait for element to be visible
   */
  async waitForElementVisible(locator: Locator, timeout: number = 30000): Promise<void> {
    this.logger.info('Waiting for element to be visible');
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for element to be hidden
   */
  async waitForElementHidden(locator: Locator, timeout: number = 30000): Promise<void> {
    this.logger.info('Waiting for element to be hidden');
    await locator.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Wait for element to be attached to DOM
   */
  async waitForElementAttached(locator: Locator, timeout: number = 30000): Promise<void> {
    this.logger.info('Waiting for element to be attached to DOM');
    await locator.waitFor({ state: 'attached', timeout });
  }

  /**
   * Wait for element to be detached from DOM
   */
  async waitForElementDetached(locator: Locator, timeout: number = 30000): Promise<void> {
    this.logger.info('Waiting for element to be detached from DOM');
    await locator.waitFor({ state: 'detached', timeout });
  }

  /**
   * Wait for page load
   */
  async waitForPageLoad(state: 'load' | 'domcontentloaded' | 'networkidle' = 'load'): Promise<void> {
    this.logger.info(`Waiting for page to reach ${state} state`);
    await this.page.waitForLoadState(state);
  }

  /**
   * Wait for network to be idle
   */
  async waitForNetworkIdle(): Promise<void> {
    this.logger.info('Waiting for network to be idle');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Wait for specific timeout (use sparingly)
   */
  async waitForTimeout(milliseconds: number): Promise<void> {
    this.logger.warn(`Hard wait for ${milliseconds}ms (use sparingly)`);
    await this.page.waitForTimeout(milliseconds);
  }

  /**
   * Wait for URL to contain specific text
   */
  async waitForUrl(urlPattern: string | RegExp, timeout: number = 30000): Promise<void> {
    this.logger.info(`Waiting for URL to match: ${urlPattern}`);
    await this.page.waitForURL(urlPattern, { timeout });
  }

  /**
   * Wait for function to return true
   */
  async waitForFunction(fn: () => boolean | Promise<boolean>, timeout: number = 30000): Promise<void> {
    this.logger.info('Waiting for custom function condition');
    await this.page.waitForFunction(fn, { timeout });
  }

  /**
   * Wait for selector to appear
   */
  async waitForSelector(selector: string, timeout: number = 30000): Promise<void> {
    this.logger.info(`Waiting for selector: ${selector}`);
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Wait for response from specific URL
   */
  async waitForResponse(urlPattern: string | RegExp, timeout: number = 30000): Promise<void> {
    this.logger.info(`Waiting for response from: ${urlPattern}`);
    await this.page.waitForResponse(urlPattern, { timeout });
  }

  /**
   * Wait for request to specific URL
   */
  async waitForRequest(urlPattern: string | RegExp, timeout: number = 30000): Promise<void> {
    this.logger.info(`Waiting for request to: ${urlPattern}`);
    await this.page.waitForRequest(urlPattern, { timeout });
  }

  /**
   * Wait for element to be enabled
   */
  async waitForElementEnabled(locator: Locator, timeout: number = 30000): Promise<void> {
    this.logger.info('Waiting for element to be enabled');
    await locator.waitFor({ state: 'visible', timeout });
    await this.page.waitForFunction(
      (element) => !element.disabled,
      await locator.elementHandle(),
      { timeout }
    );
  }

  /**
   * Wait for number of elements to match count
   */
  async waitForElementCount(locator: Locator, count: number, timeout: number = 30000): Promise<void> {
    this.logger.info(`Waiting for element count to be ${count}`);
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      const actualCount = await locator.count();
      if (actualCount === count) {
        return;
      }
      await this.page.waitForTimeout(100);
    }
    throw new Error(`Element count did not reach ${count} within ${timeout}ms`);
  }
}
