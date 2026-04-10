import { authenticatedTest as test, expect } from '../src/fixtures/authenticatedFixture';

/**
 * Authenticated user tests
 * These tests run with a pre-logged-in user
 * Tags: @authenticated, @smoke
 */
test.describe('Authenticated User Tests', () => {

  test('should display home page after authentication @authenticated @smoke', async ({ homePage }) => {
    // Assert - User should be on home page
    
    await homePage.verifyHomePageIsDisplayed();
    await homePage.navigateToSamcore();
  });

  test('should display welcome message @authenticated @smoke', async ({ homePage }) => {
    // Act
    const welcomeMessage = await homePage.getWelcomeMessage();

    // Assert
    expect(welcomeMessage).toBeTruthy();
    expect(welcomeMessage.length).toBeGreaterThan(0);
    await homePage.navigateToSamcore();

  });

});
