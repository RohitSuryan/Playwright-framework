import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Home Page Object
 * Contains all elements and methods specific to the home page
 */
export class HomePage extends BasePage {
  // Locators
  private readonly welcomeMessage: Locator;
  private readonly samcoreButton: Locator;
  private readonly settingsLink: Locator;
  private readonly samAtlasSettingButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators
    this.welcomeMessage = page.locator('h1', { hasText: 'Hello' });
    this.samcoreButton = page.locator('p').filter({ hasText: 'SAM Core' }).first();
    this.settingsLink = page.locator('p:has-text("Settings")');
    this.samAtlasSettingButton = page.locator('p:has-text("SAM Atlas Settings")');
  }

  /**
   * Get welcome message text
   */
  async getWelcomeMessage(): Promise<string> {
    await this.waitForElement(this.welcomeMessage);
    return await this.getText(this.welcomeMessage);
  }

  /**
   * Navigate to Samcore
   */
  async navigateToSamcore(): Promise<void> {
    await this.navigateTo('/sam-core'); // Assuming this is the correct path for SAM Core
    //await this.click(this.samcoreButton);
    //await this.waitForPageLoad();
  }

  /**
   * Navigate to settings
   */
  async navigateToSettings(): Promise<void> {
    await this.click(this.settingsLink);
    //await this.waitForPageLoad();
  }

  /**
   * Navigate to SAM Atlas Settings
   */
  async navigateToSamAtlasSettings(): Promise<void> {
    await this.click(this.samAtlasSettingButton);
    await this.waitForPageLoad();
  }


  /**
   * Verify home page is displayed
   */
  async verifyHomePageIsDisplayed(): Promise<void> {
    this.logger.info('Verifying home page is displayed');
    await this.verifyElementIsVisible(this.welcomeMessage);
  }

  /**
   * Check if welcome message contains username
   */
  async verifyWelcomeMessageContains(username: string): Promise<void> {
    await this.verifyElementContainsText(this.welcomeMessage, username);
  }
}
