import { apiService } from './api';
import { API_CONFIG } from '../config/api';
import { GitToken, GitTokenListResponse, CreateGitTokenRequest } from '../types/gitToken';

export class GitTokenService {
  async getGitTokens(
    token: string,
    limit: number = API_CONFIG.DEFAULT_PARAMS.LIMIT,
    offset: number = API_CONFIG.DEFAULT_PARAMS.OFFSET
  ): Promise<GitToken[]> {
    try {
      const response = await apiService.get<GitTokenListResponse>(
        API_CONFIG.ENDPOINTS.GIT_TOKENS,
        { limit, offset },
        token
      );
      return response.data.items ?? [];
    } catch (error) {
      console.error('Error fetching git tokens:', error);
      throw new Error('Failed to fetch git tokens');
    }
  }

  async createGitToken(token: string, gitTokenData: CreateGitTokenRequest): Promise<GitToken> {
    try {
      const response = await apiService.post<{ data: GitToken }>(
        API_CONFIG.ENDPOINTS.GIT_TOKENS,
        gitTokenData,
        token
      );

      return response.data;
    } catch (error) {
      console.error('Error creating git token:', error);
      throw new Error('Failed to create git token');
    }
  }

  async updateGitToken(token: string, tokenId: string, updates: Partial<CreateGitTokenRequest>): Promise<GitToken> {
    try {
      const response = await apiService.put<{ data: GitToken }>(
        `${API_CONFIG.ENDPOINTS.GIT_TOKENS}/${tokenId}`,
        updates,
        token
      );

      return response.data;
    } catch (error) {
      console.error('Error updating git token:', error);
      throw new Error('Failed to update git token');
    }
  }

  async deleteGitToken(token: string, tokenId: string): Promise<void> {
    try {
      await apiService.delete(
        `${API_CONFIG.ENDPOINTS.GIT_TOKENS}/${tokenId}`,
        token
      );
    } catch (error) {
      console.error('Error deleting git token:', error);
      throw new Error('Failed to delete git token');
    }
  }

  async validateGitToken(token: string, tokenId: string): Promise<{ valid: boolean; message?: string }> {
    try {
      const response = await apiService.post<{ data: { valid: boolean; message?: string } }>(
        `${API_CONFIG.ENDPOINTS.GIT_TOKENS}/${tokenId}/validate`,
        {},
        token
      );

      return response.data;
    } catch (error) {
      console.error('Error validating git token:', error);
      throw new Error('Failed to validate git token');
    }
  }
}

export const gitTokenService = new GitTokenService();
