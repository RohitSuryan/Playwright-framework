import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { Logger } from './Logger';
import { Config } from '../config/Config';

/**
 * API Helper utility for API testing
 * Provides methods for common HTTP operations
 */
export class ApiHelper {
  private request: APIRequestContext;
  private logger: Logger;
  private baseURL: string;

  constructor(request: APIRequestContext, baseURL?: string) {
    this.request = request;
    this.logger = new Logger('ApiHelper');
    this.baseURL = baseURL || Config.apiBaseUrl;
  }

  /**
   * Make a GET request
   */
  async get(endpoint: string, options?: any): Promise<APIResponse> {
    const url = `${this.baseURL}${endpoint}`;
    this.logger.info(`GET request to: ${url}`);

    const response = await this.request.get(url, options);
    this.logger.info(`Response status: ${response.status()}`);

    return response;
  }

  /**
   * Make a POST request
   */
  async post(endpoint: string, data?: any, options?: any): Promise<APIResponse> {
    const url = `${this.baseURL}${endpoint}`;
    this.logger.info(`POST request to: ${url}`);

    const response = await this.request.post(url, {
      data,
      ...options,
    });
    this.logger.info(`Response status: ${response.status()}`);

    return response;
  }

  /**
   * Make a PUT request
   */
  async put(endpoint: string, data?: any, options?: any): Promise<APIResponse> {
    const url = `${this.baseURL}${endpoint}`;
    this.logger.info(`PUT request to: ${url}`);

    const response = await this.request.put(url, {
      data,
      ...options,
    });
    this.logger.info(`Response status: ${response.status()}`);

    return response;
  }

  /**
   * Make a PATCH request
   */
  async patch(endpoint: string, data?: any, options?: any): Promise<APIResponse> {
    const url = `${this.baseURL}${endpoint}`;
    this.logger.info(`PATCH request to: ${url}`);

    const response = await this.request.patch(url, {
      data,
      ...options,
    });
    this.logger.info(`Response status: ${response.status()}`);

    return response;
  }

  /**
   * Make a DELETE request
   */
  async delete(endpoint: string, options?: any): Promise<APIResponse> {
    const url = `${this.baseURL}${endpoint}`;
    this.logger.info(`DELETE request to: ${url}`);

    const response = await this.request.delete(url, options);
    this.logger.info(`Response status: ${response.status()}`);

    return response;
  }

  /**
   * Verify response status code
   */
  async verifyStatusCode(response: APIResponse, expectedStatus: number): Promise<void> {
    const actualStatus = response.status();
    this.logger.info(`Verifying status code. Expected: ${expectedStatus}, Actual: ${actualStatus}`);
    expect(actualStatus).toBe(expectedStatus);
  }

  /**
   * Get response body as JSON
   */
  async getResponseBody(response: APIResponse): Promise<any> {
    return await response.json();
  }

  /**
   * Get response body as text
   */
  async getResponseText(response: APIResponse): Promise<string> {
    return await response.text();
  }

  /**
   * Verify response contains specific data
   */
  async verifyResponseContains(response: APIResponse, expectedData: any): Promise<void> {
    const responseBody = await this.getResponseBody(response);
    this.logger.info('Verifying response contains expected data');
    expect(responseBody).toMatchObject(expectedData);
  }

  /**
   * Verify response header
   */
  async verifyHeader(response: APIResponse, headerName: string, expectedValue: string): Promise<void> {
    const headers = response.headers();
    const actualValue = headers[headerName.toLowerCase()];
    this.logger.info(`Verifying header '${headerName}'. Expected: ${expectedValue}, Actual: ${actualValue}`);
    expect(actualValue).toBe(expectedValue);
  }
}
