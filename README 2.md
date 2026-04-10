# Nova Automation Framework

A comprehensive, enterprise-grade automation framework built with Playwright and TypeScript, featuring Page Object Model (POM) design pattern, custom fixtures, and best practices for maintainable test automation.

## 🏗️ Framework Architecture

This framework follows industry best practices and design patterns:

- **Page Object Model (POM)**: Separates page logic from test logic
- **Custom Fixtures**: Reusable test setup and teardown
- **Layered Architecture**: Clear separation of concerns
- **Data-Driven Testing**: Externalized test data in JSON format
- **Configuration Management**: Centralized configuration via JSON
- **Comprehensive Logging**: Winston-based logging system
- **API Testing Support**: Built-in API testing utilities

## 📁 Project Structure

```
Nova_Automation/
│
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD pipeline configuration
│
├── src/
│   ├── pages/                      # Page Object Models
│   │   ├── BasePage.ts            # Base page with 40+ reusable methods
│   │   ├── LoginPage.ts           # Login page object
│   │   └── HomePage.ts            # Home page object
│   │
│   ├── components/                 # Reusable component objects
│   │   └── ModalComponent.ts      # Modal dialog component
│   │
│   ├── fixtures/                   # Custom Playwright fixtures
│   │   ├── testFixtures.ts        # Standard test fixtures
│   │   └── authenticatedFixture.ts # Pre-authenticated fixtures
│   │
│   ├── utils/                      # Utility classes
│   │   ├── Logger.ts              # Winston-based logging
│   │   ├── TestDataHelper.ts      # Test data generation
│   │   └── ApiHelper.ts           # API testing utilities
│   │
│   ├── helpers/                    # Helper functions
│   │   ├── AssertionHelper.ts     # Custom assertions
│   │   └── WaitHelper.ts          # Wait strategies
│   │
│   ├── config/                     # Configuration management
│   │   ├── Config.ts              # Configuration helper class
│   │   └── config.json            # Application configuration
│   │
│   └── data/                       # Test data files
│       └── testData.json          # Sample test data
│
├── tests/                          # Test files
│   ├── login.spec.ts              # Login tests
│   ├── authenticated.spec.ts      # Authenticated user tests
│   ├── api.spec.ts                # API tests
│   └── example.spec.ts            # Example tests
│
├── docs/                           # Documentation
│
├── playwright.config.ts            # Playwright configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Dependencies and scripts
└── README.md                       # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js v18+ installed
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project:**
   ```bash
   cd Nova_Automation
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

4. **Configure your environment:**
   - Update `src/config/config.json` with your application URLs and test credentials
   ```json
   {
     "baseURL": "https://your-app.com",
     "apiBaseURL": "https://api.your-app.com",
     "users": {
       "testUser": {
         "email": "your-test-email@example.com",
         "password": "your-password"
       }
     }
   }
   ```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in UI mode (interactive)
npm run test:ui

# Run tests with visible browser
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run tests on specific browser
npm run test:chrome
npm run test:firefox
npm run test:safari

# Run tests on mobile
npm run test:mobile

# Run tests with specific tags
npm run test:smoke
npm run test:regression

# Run tests in parallel
npm run test:parallel

# Run tests sequentially
npm run test:sequential
```

### Viewing Reports

```bash
# Open HTML report
npm run report

# Generate Allure report
npm run allure:generate

# Open Allure report
npm run allure:open
```

## 🛠️ Development

### Code Quality

```bash
# Run linter
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

### Writing Tests

#### Basic Test Example

```typescript
import { test, expect } from '../src/fixtures/testFixtures';

test.describe('My Test Suite', () => {
  
  test('should perform action @smoke', async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
    await loginPage.loginWithTestUser();
  });
  
});
```

#### Using Custom Fixtures

```typescript
import { test, expect } from '../src/fixtures/testFixtures';

test('should use helpers', async ({ assertionHelper, waitHelper, apiHelper }) => {
  // Use assertion helper
  await assertionHelper.assertElementVisible(locator, 'My Element');
  
  // Use wait helper
  await waitHelper.waitForElementVisible(locator);
  
  // Use API helper
  const response = await apiHelper.get('/endpoint');
  await apiHelper.verifyStatusCode(response, 200);
});
```

#### Authenticated Tests

```typescript
import { authenticatedTest as test } from '../src/fixtures/authenticatedFixture';

test('should run with pre-authenticated user', async ({ homePage }) => {
  // User is already logged in
  await homePage.verifyUserIsLoggedIn();
});
```

## 📊 Features

### Page Object Model

- **BasePage**: 40+ reusable methods (click, fill, wait, verify, etc.)
- **Page Objects**: Clean, maintainable page-specific methods
- **Components**: Reusable UI components (Modals, Headers, etc.)

### Utilities

- **Logger**: Winston-based logging with multiple levels
- **TestDataHelper**: Generate random test data
- **ApiHelper**: Simplified API testing

### Helpers

- **AssertionHelper**: 15+ common assertion methods
- **WaitHelper**: Multiple wait strategies

### Reporting

- HTML Reports
- JSON Reports
- JUnit XML Reports
- Allure Reports with screenshots and traces

### Test Organization

- Tag-based test filtering (@smoke, @regression)
- Multi-browser support (Chrome, Firefox, Safari, Mobile)
- Parallel and sequential execution
- CI/CD ready with GitHub Actions

## 🔧 Configuration

### Playwright Config

Key settings in `playwright.config.ts`:
- Parallel execution
- Retries on failure
- Multiple reporters
- Screenshot/video on failure
- Timeout settings

### TypeScript Config

Path aliases for clean imports:
```typescript
import { LoginPage } from '@pages/LoginPage';
import { Logger } from '@utils/Logger';
import { Config } from '@config/Config';
```

## 📖 Best Practices

1. **Use Page Objects**: Keep test logic separate from page logic
2. **Use Fixtures**: Leverage custom fixtures for clean setup
3. **Tag Tests**: Use @smoke, @regression tags for filtering
4. **Assertions**: Use AssertionHelper for better error messages
5. **Logging**: Log important steps for debugging
6. **Waits**: Use WaitHelper instead of hard waits
7. **Test Data**: Use TestDataHelper for random data generation

## 🤝 Contributing

1. Follow existing code structure
2. Write clear, descriptive test names
3. Add appropriate tags (@smoke, @regression)
4. Run linter before committing
5. Update documentation when needed

## 📝 License

ISC

## 👥 Author

Nova Automation Team

---

**Happy Testing! 🎭**
