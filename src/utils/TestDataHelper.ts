import * as fs from 'fs';
import * as path from 'path';

/**
 * Test Data Helper utility
 * Provides methods for generating random test data and loading data files
 */
export class TestDataHelper {
  /**
   * Generate a random email address
   */
  static generateRandomEmail(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `test.user.${timestamp}.${random}@example.com`;
  }

  /**
   * Generate a random string of specified length
   */
  static generateRandomString(length: number = 10): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  /**
   * Generate a random number within a range
   */
  static generateRandomNumber(min: number = 0, max: number = 1000): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate a random phone number
   */
  static generateRandomPhoneNumber(): string {
    const areaCode = this.generateRandomNumber(200, 999);
    const firstPart = this.generateRandomNumber(200, 999);
    const secondPart = this.generateRandomNumber(1000, 9999);
    return `${areaCode}-${firstPart}-${secondPart}`;
  }

  /**
   * Generate a random name
   */
  static generateRandomName(): string {
    const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Chris', 'Anna'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
  }

  /**
   * Generate a random password
   */
  static generateRandomPassword(length: number = 12): string {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*';
    const allChars = lowercase + uppercase + numbers + symbols;

    let password = '';
    // Ensure at least one of each type
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    // Fill the rest randomly
    for (let i = password.length; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the password
    return password
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
  }

  /**
   * Load test data from JSON file
   */
  static loadTestData<T>(fileName: string): T {
    const filePath = path.join(process.cwd(), 'src', 'data', fileName);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent) as T;
  }

  /**
   * Generate random date within a range
   */
  static generateRandomDate(startDate: Date, endDate: Date): Date {
    const startTime = startDate.getTime();
    const endTime = endDate.getTime();
    const randomTime = startTime + Math.random() * (endTime - startTime);
    return new Date(randomTime);
  }

  /**
   * Generate random boolean
   */
  static generateRandomBoolean(): boolean {
    return Math.random() < 0.5;
  }

  /**
   * Select random item from array
   */
  static selectRandomFromArray<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
}
