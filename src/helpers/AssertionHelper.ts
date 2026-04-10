import { expect, Locator, Page } from '@playwright/test';
import { Logger } from '../utils/Logger';

/**
 * Assertion Helper
 * Provides reusable assertion methods for common test scenarios
 */
export class AssertionHelper {
  private logger: Logger;

  constructor() {
    this.logger = new Logger('AssertionHelper');
  }

  /**
   * Assert element is visible
   */
  async assertElementVisible(locator: Locator, elementName: string = 'Element'): Promise<void> {
    this.logger.info(`Asserting ${elementName} is visible`);
    await expect(locator).toBeVisible();
  }

  /**
   * Assert element is hidden
   */
  async assertElementHidden(locator: Locator, elementName: string = 'Element'): Promise<void> {
    this.logger.info(`Asserting ${elementName} is hidden`);
    await expect(locator).toBeHidden();
  }

  /**
   * Assert element has text
   */
  async assertElementHasText(locator: Locator, expectedText: string, elementName: string = 'Element'): Promise<void> {
    this.logger.info(`Asserting ${elementName} has text: "${expectedText}"`);
    await expect(locator).toHaveText(expectedText);
  }

  /**
   * Assert element contains text
   */
  async assertElementContainsText(locator: Locator, expectedText: string, elementName: string = 'Element'): Promise<void> {
    this.logger.info(`Asserting ${elementName} contains text: "${expectedText}"`);
    await expect(locator).toContainText(expectedText);
  }

  /**
   * Assert element is enabled
   */
  async assertElementEnabled(locator: Locator, elementName: string = 'Element'): Promise<void> {
    this.logger.info(`Asserting ${elementName} is enabled`);
    await expect(locator).toBeEnabled();
  }

  /**
   * Assert element is disabled
   */
  async assertElementDisabled(locator: Locator, elementName: string = 'Element'): Promise<void> {
    this.logger.info(`Asserting ${elementName} is disabled`);
    await expect(locator).toBeDisabled();
  }

  /**
   * Assert element is checked (for checkboxes/radio buttons)
   */
  async assertElementChecked(locator: Locator, elementName: string = 'Element'): Promise<void> {
    this.logger.info(`Asserting ${elementName} is checked`);
    await expect(locator).toBeChecked();
  }

  /**
   * Assert element has attribute
   */
  async assertElementHasAttribute(locator: Locator, attributeName: string, expectedValue: string, elementName: string = 'Element'): Promise<void> {
    this.logger.info(`Asserting ${elementName} has attribute "${attributeName}" with value "${expectedValue}"`);
    await expect(locator).toHaveAttribute(attributeName, expectedValue);
  }

  /**
   * Assert element count
   */
  async assertElementCount(locator: Locator, expectedCount: number, elementName: string = 'Elements'): Promise<void> {
    this.logger.info(`Asserting ${elementName} count is ${expectedCount}`);
    await expect(locator).toHaveCount(expectedCount);
  }

  /**
   * Assert URL contains text
   */
  async assertUrlContains(page: Page, expectedUrlPart: string): Promise<void> {
    this.logger.info(`Asserting URL contains: "${expectedUrlPart}"`);
    await expect(page).toHaveURL(new RegExp(expectedUrlPart));
  }

  /**
   * Assert page title
   */
  async assertPageTitle(page: Page, expectedTitle: string): Promise<void> {
    this.logger.info(`Asserting page title is: "${expectedTitle}"`);
    await expect(page).toHaveTitle(expectedTitle);
  }

  /**
   * Assert element has value (for input fields)
   */
  async assertElementHasValue(locator: Locator, expectedValue: string, elementName: string = 'Element'): Promise<void> {
    this.logger.info(`Asserting ${elementName} has value: "${expectedValue}"`);
    await expect(locator).toHaveValue(expectedValue);
  }

  /**
   * Assert element has class
   */
  async assertElementHasClass(locator: Locator, className: string, elementName: string = 'Element'): Promise<void> {
    this.logger.info(`Asserting ${elementName} has class: "${className}"`);
    await expect(locator).toHaveClass(new RegExp(className));
  }

  /**
   * Assert element is focused
   */
  async assertElementFocused(locator: Locator, elementName: string = 'Element'): Promise<void> {
    this.logger.info(`Asserting ${elementName} is focused`);
    await expect(locator).toBeFocused();
  }

  /**
   * Assert element is editable
   */
  async assertElementEditable(locator: Locator, elementName: string = 'Element'): Promise<void> {
    this.logger.info(`Asserting ${elementName} is editable`);
    await expect(locator).toBeEditable();
  }
}
