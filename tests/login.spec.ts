import { test, expect } from '../src/fixtures/testFixtures';
import { TestDataHelper } from '../src/utils/TestDataHelper';

/**
 * Login functionality test suite
 * Tags: @smoke, @regression
 */
test.describe('Login Tests', () => {
  
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
  });

  test.only('should display login page correctly @smoke', async ({ loginPage }) => {
    await loginPage.verifyLoginPageIsDisplayed();
  });

  test('should login successfully with valid credentials @smoke @regression', async ({ loginPage, homePage }) => {
    // Arrange - Get test user from config
    await loginPage.loginWithTestUser();

    // Assert - Verify successful login
    await homePage.verifyUserIsLoggedIn();
  });

  test('should show error with invalid credentials @regression', async ({ loginPage }) => {
    // Arrange
    const invalidEmail = 'invalid@example.com';
    const invalidPassword = 'wrongpassword';

    // Act
    await loginPage.login(invalidEmail, invalidPassword);

    // Assert - Verify error message is displayed
    await loginPage.verifyErrorMessageIsDisplayed();
  });

  test('should show error with empty credentials @regression', async ({ loginPage }) => {
    // Act
    await loginPage.clickLoginButton();

    // Assert - Login button should still be visible (form validation)
    await loginPage.verifyLoginPageIsDisplayed();
  });

  test('should navigate to forgot password page @regression', async ({ loginPage, page }) => {
    // Act
    await loginPage.clickForgotPassword();

    // Assert - Verify URL or page element
    expect(page.url()).toContain('forgot');
  });

  test('should login with generated random user data @smoke', async ({ loginPage }) => {
    // Arrange - Generate random test data
    const email = TestDataHelper.generateRandomEmail();
    const password = TestDataHelper.generateRandomPassword();

    // Act - Try to login (will fail as user doesn't exist, but demonstrates test data generation)
    await loginPage.enterEmail(email);
    await loginPage.enterPassword(password);
    
    // Assert - Verify inputs are filled
    const emailValue = await loginPage['emailInput'].inputValue();
    expect(emailValue).toBe(email);
  });

  test('should clear login form @regression', async ({ loginPage }) => {
    // Arrange
    await loginPage.enterEmail('test@example.com');
    await loginPage.enterPassword('password123');

    // Act
    await loginPage.clearForm();

    // Assert
    const emailValue = await loginPage['emailInput'].inputValue();
    const passwordValue = await loginPage['passwordInput'].inputValue();
    expect(emailValue).toBe('');
    expect(passwordValue).toBe('');
  });
});
