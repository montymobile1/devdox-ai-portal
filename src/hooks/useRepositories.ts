import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { repositoryService } from '../services/repositoryService';
import { Repository } from '../types/repository';

export function useRepositories(limit?: number, offset?: number) {
  const { getToken } = useAuth();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRepositories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = await getToken();

      if (!token) {
        throw new Error('Authentication token not available');
      }

      const repos = await repositoryService.getRepositories(token, limit, offset);
      setRepositories(repos);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unexpected error occurred';
      setError(errorMessage);
      console.error('Repository fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [getToken, limit, offset]);

  const analyzeRepository = useCallback(async (repositoryId: string) => {
    try {
      const token = await getToken();

      if (!token) {
        throw new Error('Authentication token not available');
      }

      await repositoryService.analyzeRepository(token, repositoryId);

      // Refresh the repositories list after analysis
      await fetchRepositories();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze repository';
      setError(errorMessage);
      console.error('Repository analysis error:', err);
    }
  }, [getToken, fetchRepositories]);

  useEffect(() => {
    fetchRepositories();
  }, [fetchRepositories]);

  return {
    repositories,
    loading,
    error,
    fetchRepositories,
    analyzeRepository,
  };
}
