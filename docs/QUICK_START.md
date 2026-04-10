# Quick Start Guide - Nova Automation Framework

## 🎯 Goal

Get you up and running with the Nova Automation Framework in under 10 minutes!

## ✅ Prerequisites

Before you begin, ensure you have:

- ✅ Node.js v18+ installed ([Download](https://nodejs.org/))
- ✅ Git installed
- ✅ Code editor (VS Code recommended)
- ✅ Basic TypeScript/JavaScript knowledge

## 🚀 Setup Steps

### Step 1: Verify Node.js Version

```bash
node --version
# Should show v18.0.0 or higher
```

If not, update Node.js or use nvm:
```bash
nvm use 20
```

### Step 2: Navigate to Project

```bash
cd Nova_Automation
```

### Step 3: Install Dependencies

```bash
npm install
```

This installs:
- Playwright test framework
- TypeScript
- Winston logger
- Allure reports
- ESLint & Prettier
- All other dependencies

**Expected time:** 1-2 minutes

### Step 4: Install Playwright Browsers

```bash
npx playwright install
```

This downloads Chromium, Firefox, and WebKit browsers.

**Expected time:** 2-3 minutes  
**Download size:** ~400MB

### Step 5: Configure Application Settings

Edit `src/config/config.json`:

```json
{
  "environment": "development",
  "baseURL": "https://your-app-url.com",
  "apiBaseURL": "https://api.your-app-url.com",
  "users": {
    "testUser": {
      "email": "your-test-email@example.com",
      "password": "your-test-password"
    }
  }
}
```

Replace with your actual application URLs and test credentials.

### Step 6: Verify Installation

Run a quick check:

```bash
npm run type-check
```

Should complete without errors.

## 🧪 Running Your First Tests

### Run Example Test

```bash
npm test
```

This runs all tests in headless mode.

### Run in UI Mode (Recommended for first time)

```bash
npm run test:ui
```

This opens Playwright's interactive UI where you can:
- See all tests
- Run tests one by one
- Watch tests execute
- Debug failures

### Run with Visible Browser

```bash
npm run test:headed
```

Watch the browser automation in action!

## 📊 View Test Reports

After running tests:

```bash
npm run report
```

This opens the HTML report in your browser showing:
- Test results
- Screenshots (on failure)
- Videos (on failure)
- Execution time

## 🎓 Next Steps

### 1. Explore the Framework

```bash
# View project structure
ls -la src/

# Check available test files
ls -la tests/
```

### 2. Run Specific Tests

```bash
# Run only login tests
npx playwright test login

# Run only smoke tests
npm run test:smoke

# Run only on Chrome
npm run test:chrome
```

### 3. Create Your First Page Object

Create `src/pages/MyPage.ts`:

```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class MyPage extends BasePage {
  private readonly myButton: Locator;

  constructor(page: Page) {
    super(page);
    this.myButton = page.locator('button#my-button');
  }

  async clickMyButton(): Promise<void> {
    await this.click(this.myButton);
  }
}
```

### 4. Create Your First Test

Create `tests/mytest.spec.ts`:

```typescript
import { test, expect } from '../src/fixtures/testFixtures';

test.describe('My Test Suite', () => {
  
  test('should do something @smoke', async ({ page }) => {
    await page.goto('https://example.com');
    expect(await page.title()).toBeTruthy();
  });
  
});
```

Run it:
```bash
npx playwright test mytest
```

## 🔍 Understanding the Structure

```
Nova_Automation/
├── src/
│   ├── pages/          ← Page Objects (LoginPage, HomePage)
│   ├── fixtures/       ← Test setup (fixtures)
│   ├── utils/          ← Utilities (Logger, ApiHelper)
│   ├── helpers/        ← Helpers (Assertions, Waits)
│   └── config/         ← Configuration files
│
└── tests/              ← Your test files (.spec.ts)
```

## 💡 Common Commands Cheat Sheet

```bash
# Running Tests
npm test                    # Run all tests
npm run test:ui            # Interactive UI mode
npm run test:headed        # Show browser
npm run test:debug         # Debug mode
npm run test:chrome        # Chrome only
npm run test:smoke         # Smoke tests only

# Reports
npm run report             # HTML report
npm run allure:generate    # Generate Allure report
npm run allure:open        # Open Allure report

# Code Quality
npm run lint               # Check code quality
npm run format             # Format code
npm run type-check         # Check TypeScript
```

## 🎯 Your First Real Test

Let's write a complete login test:

```typescript
import { test, expect } from '../src/fixtures/testFixtures';

test.describe('Login Flow', () => {
  
  test('should login successfully @smoke', async ({ loginPage, homePage }) => {
    // Navigate to login page
    await loginPage.navigateToLoginPage();
    
    // Login with test user
    await loginPage.loginWithTestUser();
    
    // Verify successful login
    await homePage.verifyUserIsLoggedIn();
  });
  
});
```

That's it! The framework handles:
- Browser setup
- Page object initialization
- Logging
- Screenshots on failure
- Test cleanup

## 🐛 Troubleshooting

### Error: "Cannot find module"

```bash
npm install
```

### Error: "Browsers not installed"

```bash
npx playwright install
```

### Tests fail with "Timeout"

- Check if application URL is correct in `config.json`
- Increase timeout in `playwright.config.ts`
- Check internet connection

### TypeScript errors

```bash
npm run type-check
```

Fix any errors reported.

## 📚 Learning Resources

1. **Framework Documentation**
   - [Framework Overview](./FRAMEWORK_OVERVIEW.md)
   - [Framework Structure](./FRAMEWORK_STRUCTURE.md)

2. **Example Tests**
   - `tests/login.spec.ts` - Login tests
   - `tests/authenticated.spec.ts` - Authenticated tests
   - `tests/api.spec.ts` - API tests

3. **Page Objects**
   - `src/pages/BasePage.ts` - Base methods
   - `src/pages/LoginPage.ts` - Login page example
   - `src/pages/HomePage.ts` - Home page example

4. **Official Docs**
   - [Playwright Documentation](https://playwright.dev/docs/intro)
   - [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🎉 Success Checklist

- ✅ Dependencies installed
- ✅ Browsers downloaded
- ✅ Configuration updated
- ✅ Tests running successfully
- ✅ Reports generated
- ✅ First test written

## 🤔 Need Help?

1. Check error messages carefully
2. Review example tests
3. Check configuration files
4. Verify URLs and credentials
5. Check Playwright documentation

---

**You're all set! Happy testing! 🎭**

*Time to complete: ~10 minutes*
