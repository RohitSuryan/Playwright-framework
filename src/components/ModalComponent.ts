import { Page, Locator } from '@playwright/test';
import { Logger } from '../utils/Logger';

/**
 * Modal Component
 * Reusable component for handling modal dialogs
 */
export class ModalComponent {
  private page: Page;
  private logger: Logger;
  private readonly modal: Locator;
  private readonly modalTitle: Locator;
  private readonly modalBody: Locator;
  private readonly closeButton: Locator;
  private readonly confirmButton: Locator;
  private readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logger = new Logger('ModalComponent');
    
    // Initialize locators
    this.modal = page.locator('.modal, [role="dialog"], .dialog');
    this.modalTitle = this.modal.locator('.modal-title, .dialog-title, h2, h3');
    this.modalBody = this.modal.locator('.modal-body, .dialog-content');
    this.closeButton = this.modal.locator('button.close, button[aria-label="Close"], .close-button');
    this.confirmButton = this.modal.locator('button:has-text("Confirm"), button:has-text("OK"), button:has-text("Yes")');
    this.cancelButton = this.modal.locator('button:has-text("Cancel"), button:has-text("No")');
  }

  /**
   * Wait for modal to be visible
   */
  async waitForModal(timeout: number = 10000): Promise<void> {
    this.logger.info('Waiting for modal to appear');
    await this.modal.waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for modal to be hidden
   */
  async waitForModalToClose(timeout: number = 10000): Promise<void> {
    this.logger.info('Waiting for modal to close');
    await this.modal.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Get modal title
   */
  async getModalTitle(): Promise<string> {
    const title = await this.modalTitle.textContent();
    return title || '';
  }

  /**
   * Get modal body text
   */
  async getModalBodyText(): Promise<string> {
    const text = await this.modalBody.textContent();
    return text || '';
  }

  /**
   * Click confirm button
   */
  async clickConfirm(): Promise<void> {
    this.logger.info('Clicking confirm button');
    await this.confirmButton.click();
  }

  /**
   * Click cancel button
   */
  async clickCancel(): Promise<void> {
    this.logger.info('Clicking cancel button');
    await this.cancelButton.click();
  }

  /**
   * Close modal using close button
   */
  async close(): Promise<void> {
    this.logger.info('Closing modal');
    await this.closeButton.click();
  }

  /**
   * Check if modal is visible
   */
  async isModalVisible(): Promise<boolean> {
    return await this.modal.isVisible();
  }

  /**
   * Verify modal title
   */
  async verifyModalTitle(expectedTitle: string): Promise<void> {
    const actualTitle = await this.getModalTitle();
    this.logger.info(`Verifying modal title. Expected: ${expectedTitle}, Actual: ${actualTitle}`);
    if (!actualTitle.includes(expectedTitle)) {
      throw new Error(`Modal title mismatch. Expected: ${expectedTitle}, Actual: ${actualTitle}`);
    }
  }

  /**
   * Verify modal contains text
   */
  async verifyModalContainsText(expectedText: string): Promise<void> {
    const bodyText = await this.getModalBodyText();
    this.logger.info(`Verifying modal contains text: ${expectedText}`);
    if (!bodyText.includes(expectedText)) {
      throw new Error(`Modal does not contain expected text: ${expectedText}`);
    }
  }
}
