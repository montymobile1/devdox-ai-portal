import { apiService } from './api';
import { API_CONFIG } from '../config/api';
import { ApiKey, ApiKeyListResponse } from '../types/apiKey';

export class ApiKeyService {
  async getApiKeys(token: string): Promise<ApiKey[]> {
    try {
      const response = await apiService.get<ApiKeyListResponse>(
        API_CONFIG.ENDPOINTS.API_KEYS,
        {},
        token
      );

      // Defensive checks for response structure
      if (!response) {
        console.warn('API returned null/undefined response');
        return [];
      }

      if (!response.data) {
        console.warn('API response missing data field:', response);
        return [];
      }

      if (!Array.isArray(response.data.items)) {
        console.error('API response.data is not an array:', response.data.items);
        return [];
      }
      console.log("response .data", response.data.items)
      return response.data.items;
    } catch (error) {
      console.error('Failed to fetch API keys:', error);

      // Provide more specific error messages
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to API server');
      }

      if (error instanceof Error && error.message.includes('401')) {
        throw new Error('Authentication failed. Please sign in again.');
      }

      if (error instanceof Error && error.message.includes('403')) {
        throw new Error('Access denied. You do not have permission to view API keys.');
      }

      throw new Error('Failed to fetch API keys. Please try again later.');
    }
  }

  async createApiKey(token: string): Promise<ApiKey> {
    try {
      const response = await apiService.post<{ data: ApiKey }>(
        API_CONFIG.ENDPOINTS.API_KEYS,
        {},
        token
      );

      if (!response || !response.data) {
        throw new Error('Invalid response from server');
      }

      return response.data;
    } catch (error) {
      console.error('Failed to create API key:', error);

      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to API server');
      }

      if (error instanceof Error && error.message.includes('401')) {
        throw new Error('Authentication failed. Please sign in again.');
      }

      throw new Error('Failed to create API key. Please try again.');
    }
  }

  async deleteApiKey(token: string, apiKeyId: string): Promise<void> {
    try {
      await apiService.delete(
        `${API_CONFIG.ENDPOINTS.API_KEYS}${apiKeyId}`,
        token
      );
    } catch (error) {
      console.error('Failed to delete API key:', error);

      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to API server');
      }

      if (error instanceof Error && error.message.includes('404')) {
        throw new Error('API key not found');
      }

      throw new Error('Failed to delete API key. Please try again.');
    }
  }

  async validateApiKey(
    token: string,
    apiKeyId: string
  ): Promise<{ valid: boolean; message?: string }> {
    try {
      const response = await apiService.post<{
        data: { valid: boolean; message?: string };
      }>(
        `${API_CONFIG.ENDPOINTS.API_KEYS}${apiKeyId}/validate`,
        {},
        token
      );

      if (!response || !response.data) {
        return { valid: false, message: 'Invalid response from server' };
      }

      return response.data;
    } catch (error) {
      console.error('Failed to validate API key:', error);
      throw new Error('Failed to validate API key');
    }
  }
}

export const apiKeyService = new ApiKeyService();