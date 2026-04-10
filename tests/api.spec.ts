import { test, expect } from '../src/fixtures/testFixtures';

/**
 * API Tests
 * Tests for API endpoints
 * Tags: @api, @regression
 */
test.describe('API Tests', () => {

  test('should get users list @api @smoke', async ({ apiHelper }) => {
    // Act
    const response = await apiHelper.get('/users');

    // Assert
    await apiHelper.verifyStatusCode(response, 200);
    const responseBody = await apiHelper.getResponseBody(response);
    expect(responseBody).toBeTruthy();
  });

  test('should create a new user @api @regression', async ({ apiHelper }) => {
    // Arrange
    const newUser = {
      name: 'Test User',
      email: 'testuser@example.com',
      role: 'user'
    };

    // Act
    const response = await apiHelper.post('/users', newUser);

    // Assert
    await apiHelper.verifyStatusCode(response, 201);
    const responseBody = await apiHelper.getResponseBody(response);
    expect(responseBody).toMatchObject(newUser);
  });

  test('should update user @api @regression', async ({ apiHelper }) => {
    // Arrange
    const userId = 1;
    const updatedData = {
      name: 'Updated User Name'
    };

    // Act
    const response = await apiHelper.put(`/users/${userId}`, updatedData);

    // Assert
    await apiHelper.verifyStatusCode(response, 200);
  });

  test('should delete user @api @regression', async ({ apiHelper }) => {
    // Arrange
    const userId = 1;

    // Act
    const response = await apiHelper.delete(`/users/${userId}`);

    // Assert
    await apiHelper.verifyStatusCode(response, 204);
  });

  test('should verify response headers @api @regression', async ({ apiHelper }) => {
    // Act
    const response = await apiHelper.get('/users');

    // Assert
    await apiHelper.verifyStatusCode(response, 200);
    await apiHelper.verifyHeader(response, 'content-type', 'application/json');
  });

  test('should handle 404 error @api @regression', async ({ apiHelper }) => {
    // Act
    const response = await apiHelper.get('/nonexistent-endpoint');

    // Assert
    await apiHelper.verifyStatusCode(response, 404);
  });
});
