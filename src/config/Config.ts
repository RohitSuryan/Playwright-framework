import * as configData from './config.json';

/**
 * Type for environment-specific configuration
 */
type EnvironmentConfig = {
  baseURL: string;
  apiBaseURL: string;
  credentials: {
    username: string;
    domain: string;
    password: string;
  };
};

/**
 * Configuration helper class
 * Provides centralized access to configuration values
 */
export class Config {
  /**
   * Get the current environment (dev/qa/prod)
   */
  static get environment(): string {
    return configData.environment;
  }

  /**
   * Get the browser to run tests on (chromium/firefox/webkit)
   */
  static get browser(): string {
    return configData.browser;
  }

  /**
   * Get current environment configuration
   */
  private static getCurrentEnvConfig(): EnvironmentConfig {
    type EnvKey = keyof typeof configData.environments;
    const env = configData.environment as EnvKey;
    return configData.environments[env];
  }

  /**
   * Get the base URL for the application
   */
  static get baseUrl(): string {
    return this.getCurrentEnvConfig().baseURL;
  }

  /**
   * Get the API base URL
   */
  static get apiBaseUrl(): string {
    return this.getCurrentEnvConfig().apiBaseURL;
  }

  /**
   * Get username for current environment
   */
  static get username(): string {
    return this.getCurrentEnvConfig().credentials.username;
  }

  /**
   * Get domain for current environment
   */
  static get domain(): string {
    return this.getCurrentEnvConfig().credentials.domain;
  }

  /**
   * Get password for current environment
   */
  static get password(): string {
    return this.getCurrentEnvConfig().credentials.password;
  }
}

