import { defineConfig, devices } from '@playwright/test';
import { Config } from './src/config/Config';

/**
 * Enhanced Playwright Test Configuration
 * Nova Automation Framework
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Retry failed tests */
  //retries: 0,
  
  /* Configure workers - parallel execution */
  workers: 4,
  
  /* Timeout for each test */
  timeout: 60000,
  
  /* Expect timeout */
  expect: {
    timeout: 10000,
  },
  
  /* Reporter configuration - List (console) + HTML report */
  reporter: [['list'], ['html']],
  
  /* Shared settings for all the projects below */
  use: {
    /* Base URL from config */
    baseURL: Config.baseUrl,
    
    /* Collect trace when retrying the failed test */
    trace: 'retain-on-failure',
    
    /* Take screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* Record video on failure */
    video: 'retain-on-failure',
    
    /* Headless mode */
    headless: false,
    
    /* Action and navigation timeouts */
    actionTimeout: 15000,
    navigationTimeout: 30000,
    
    /* Viewport size */
    viewport: { width: 1920, height: 1080 },
  },

  /* Configure browser project from config */
  projects: [
    {
      name: Config.browser,
      use: { ...devices[Config.browser === 'chromium' ? 'Desktop Chrome' : Config.browser === 'firefox' ? 'Desktop Firefox' : 'Desktop Safari'] },
    }
  ],

  /* Output directory for test artifacts */
  outputDir: 'test-results/',
});
