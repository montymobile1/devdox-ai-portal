import { apiService } from './api';
import { API_CONFIG } from '../config/api';
import { ApiKey, ApiKeyListResponse } from '../types/apiKey.ts';

export class ApiKeyService {
  async getApiKeys(
    token: string,
  ): Promise<ApiKey[]> {
    try {
      const response = await apiService.get<ApiKeyListResponse>(
        API_CONFIG.ENDPOINTS.API_KEYS,
        {},
        token
      );
      console.log("API Keys response:", response.data);
      return response.data ?? [];
    } catch (error) {
      console.error('Error fetching API keys:', error);
      throw new Error('Failed to fetch API keys');
    }
  }

  async createApiKey(token: string): Promise<ApiKey> {
    try {
      const response = await apiService.post<{ data: ApiKey }>(
        API_CONFIG.ENDPOINTS.API_KEYS,
        {},
        token
      );

      return response.data;
    } catch (error) {
      console.error('Error creating API key:', error);
      throw new Error('Failed to create API key');
    }
  }

  async deleteApiKey(token: string, apiKeyId: string): Promise<void> {
    try {
      await apiService.delete(
        `${API_CONFIG.ENDPOINTS.API_KEYS}/${apiKeyId}`,
        token
      );
    } catch (error) {
      console.error('Error deleting API key:', error);
      throw new Error('Failed to delete API key');
    }
  }

  async validateApiKey(token: string, apiKeyId: string): Promise<{ valid: boolean; message?: string }> {
    try {
      const response = await apiService.post<{ data: { valid: boolean; message?: string } }>(
        `${API_CONFIG.ENDPOINTS.API_KEYS}/${apiKeyId}/validate`,
        {},
        token
      );
      return response.data;
    } catch (error) {
      console.error('Error validating API key:', error);
      throw new Error('Failed to validate API key');
    }
  }
}

export const apiKeyService = new ApiKeyService();
