# Nova Automation Framework - Overview

## 📦 What's Included

This is a production-ready, enterprise-grade Playwright automation framework with TypeScript. It includes:

### Core Framework Components

1. **Page Object Model (POM) Architecture**
   - BasePage with 40+ reusable methods
   - LoginPage and HomePage examples
   - Component-based architecture (ModalComponent)

2. **Custom Test Fixtures**
   - Standard test fixtures for dependency injection
   - Authenticated fixtures for pre-logged-in tests
   - Extensible fixture pattern

3. **Utilities & Helpers**
   - Logger with Winston (info, error, debug, warn)
   - TestDataHelper (random data generation, JSON loading)
   - ApiHelper (GET, POST, PUT, PATCH, DELETE)
   - AssertionHelper (15+ common assertions)
   - WaitHelper (various wait strategies)

4. **Configuration Management**
   - Centralized configuration via JSON
   - Config class for easy access
   - Environment-specific settings

5. **Test Examples**
   - Login tests (smoke & regression)
   - Authenticated user tests
   - API tests
   - Example tests

6. **CI/CD Integration**
   - GitHub Actions workflow
   - Multi-browser testing
   - Parallel execution
   - Artifact upload

7. **Reporting**
   - HTML reports
   - JSON reports
   - JUnit XML reports
   - Allure reports support

8. **Code Quality Tools**
   - ESLint configuration
   - Prettier formatting
   - TypeScript strict mode
   - Path aliases

## 🎯 Key Features

### 1. Layered Architecture

```
┌─────────────────────────────────────┐
│         Test Layer                  │
│  (tests/*.spec.ts)                  │
└─────────────────────────────────────┘
              │
┌─────────────────────────────────────┐
│      Fixtures Layer                 │
│  (src/fixtures/)                    │
└─────────────────────────────────────┘
              │
┌─────────────────────────────────────┐
│    Page Object Layer                │
│  (src/pages/, src/components/)      │
└─────────────────────────────────────┘
              │
┌─────────────────────────────────────┐
│     Utilities Layer                 │
│  (src/utils/, src/helpers/)         │
└─────────────────────────────────────┘
```

### 2. Design Patterns Used

- **Page Object Pattern**: Encapsulates page-specific logic
- **Factory Pattern**: Test data creation
- **Singleton Pattern**: Configuration management
- **Strategy Pattern**: Different wait strategies
- **Dependency Injection**: Through custom fixtures

### 3. Test Organization

Tests are organized with tags for easy filtering:
- `@smoke` - Critical path tests
- `@regression` - Full regression suite
- `@api` - API tests
- `@authenticated` - Tests requiring authentication

### 4. Parallel Execution

- Configurable number of workers
- Automatic test distribution
- Isolated browser contexts
- Thread-safe execution

### 5. Comprehensive Logging

- Console and file logging
- Different log levels (info, error, debug, warn)
- Contextual logging per test/page
- Error logs in separate file

## 🚀 Quick Start

### 1. Installation
```bash
npm install
npx playwright install
```

### 2. Configuration
Update `src/config/config.json` with your app details.

### 3. Run Tests
```bash
npm test
```

### 4. View Reports
```bash
npm run report
```

## 📚 Learn More

- [Framework Structure](./FRAMEWORK_STRUCTURE.md)
- [Quick Start Guide](./QUICK_START.md)
- [Playwright Documentation](https://playwright.dev)

## 🎓 Training Resources

### For Beginners
1. Start with `tests/example.spec.ts`
2. Read `src/pages/BasePage.ts` to understand available methods
3. Create your first page object
4. Write a simple test using fixtures

### For Advanced Users
1. Create custom fixtures
2. Extend BasePage with domain-specific methods
3. Implement data-driven testing
4. Set up CI/CD pipelines

## 🔧 Customization

### Adding New Page Objects

```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class MyNewPage extends BasePage {
  private readonly myElement: Locator;

  constructor(page: Page) {
    super(page);
    this.myElement = page.locator('.my-selector');
  }

  async performAction(): Promise<void> {
    await this.click(this.myElement);
  }
}
```

### Adding New Fixtures

```typescript
import { test as base } from '@playwright/test';
import { MyNewPage } from '../pages/MyNewPage';

type MyFixtures = {
  myNewPage: MyNewPage;
};

export const test = base.extend<MyFixtures>({
  myNewPage: async ({ page }, use) => {
    const myNewPage = new MyNewPage(page);
    await use(myNewPage);
  },
});
```

## 🎯 Best Practices

1. **One assertion per test** (or logically grouped)
2. **Use descriptive test names**
3. **Tag your tests appropriately**
4. **Keep page objects focused** (Single Responsibility)
5. **Use fixtures for setup/teardown**
6. **Avoid hard-coded waits** (use WaitHelper)
7. **Generate dynamic test data** (use TestDataHelper)
8. **Log important steps** (use Logger)

## 🐛 Troubleshooting

### Tests are flaky
- Use proper waits (WaitHelper)
- Check for dynamic content loading
- Verify selectors are stable

### Tests are slow
- Enable parallel execution
- Use authenticated fixtures
- Optimize waits

### CI/CD failures
- Check browser installation
- Verify environment configuration
- Review CI logs and artifacts

## 📈 Metrics & Reporting

### Allure Reports Include:
- Test execution timeline
- Screenshots on failure
- Video recordings
- Trace files
- Test history
- Trends and statistics

### HTML Reports Include:
- Test results by browser
- Execution time
- Screenshots and videos
- Error stack traces

## 🔐 Security

- Never commit `config.json` with real credentials
- Use environment variables in CI/CD
- Rotate test credentials regularly
- Secure sensitive test data

## 📞 Support

For questions or issues:
1. Check documentation
2. Review example tests
3. Check Playwright docs
4. Contact team lead

---

**Built with ❤️ using Playwright and TypeScript**
