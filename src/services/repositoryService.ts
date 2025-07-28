import { apiService } from './api';
import { API_CONFIG } from '../config/api';
import { Repository, RepositoryListResponse } from '../types/repository';

export class RepositoryService {
  async getRepositories(
    token: string,
    limit: number = API_CONFIG.DEFAULT_PARAMS.LIMIT,
    offset: number = API_CONFIG.DEFAULT_PARAMS.OFFSET
  ): Promise<Repository[]> {
    try {
      const response = await apiService.get<RepositoryListResponse>(
        API_CONFIG.ENDPOINTS.REPOSITORIES,
        Object.fromEntries(
        Object.entries({ limit, offset }).filter(([, v]) => v !== undefined)
        ),
        token
      );

      return response.data.repos || [];
    } catch (error) {
      console.error('Error fetching repositories:', error);
      throw new Error('Failed to fetch repositories');
    }
  }

  async analyzeRepository(token: string, repositoryId: string): Promise<void> {
  try {
    await apiService.post(
      API_CONFIG.ENDPOINTS.ANALYZE_REPO,
      { id: repositoryId },
      token
    );
  } catch {
    throw new Error('Failed to analyze repository');
  }
}

  async getRepositoriesByTokenId(token: string, tokenId: string): Promise<Repository[]> {
    try {
         const response = await apiService.get<{ data: { repos: Repository[] } }>(
        `${API_CONFIG.ENDPOINTS.GIT_REPOS}/${tokenId}`,
        {},
        token
      );
      return response.data.repos;
    } catch (error) {
      console.error('Error fetching repositories:', error);
      throw new Error('Failed to fetch repositories');
    }
  }
}

export const repositoryService = new RepositoryService();



