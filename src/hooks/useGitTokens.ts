import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { gitTokenService } from '../services/gitTokenService';
import { GitToken, CreateGitTokenRequest } from '../types/gitToken';

export function useGitTokens(limit?: number, offset?: number) {
  const { getToken } = useAuth();
  const [gitTokens, setGitTokens] = useState<GitToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGitTokens = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = await getToken();

      if (!token) {
        throw new Error('Authentication token not available');
      }

      const tokens = await gitTokenService.getGitTokens(token, limit, offset);
      setGitTokens(tokens);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unexpected error occurred';
      setError(errorMessage);
      console.error('Git tokens fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [getToken, limit, offset]);

  const createGitToken = useCallback(async (gitTokenData: CreateGitTokenRequest) => {
    try {
      const token = await getToken();

      if (!token) {
        throw new Error('Authentication token not available');
      }

      const newToken = await gitTokenService.createGitToken(token, gitTokenData);
      setGitTokens(prev => [...prev, newToken]);

      return newToken;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create git token';
      setError(errorMessage);
      console.error('Git token creation error:', err);
      throw err;
    }
  }, [getToken]);

  const updateGitToken = useCallback(async (tokenId: string, updates: Partial<CreateGitTokenRequest>) => {
    try {
      const token = await getToken();

      if (!token) {
        throw new Error('Authentication token not available');
      }

      const updatedToken = await gitTokenService.updateGitToken(token, tokenId, updates);
      setGitTokens(prev => prev.map(t => t.id === tokenId ? updatedToken : t));

      return updatedToken;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update git token';
      setError(errorMessage);
      console.error('Git token update error:', err);
      throw err;
    }
  }, [getToken]);

  const deleteGitToken = useCallback(async (tokenId: string) => {
    try {
      const token = await getToken();

      if (!token) {
        throw new Error('Authentication token not available');
      }

      await gitTokenService.deleteGitToken(token, tokenId);
      setGitTokens(prev => prev.filter(t => t.id !== tokenId));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete git token';
      setError(errorMessage);
      console.error('Git token deletion error:', err);
      throw err;
    }
  }, [getToken]);


  useEffect(() => {
    fetchGitTokens();
  }, [fetchGitTokens]);

  return {
    gitTokens,
    loading,
    error,
    fetchGitTokens,
    createGitToken,
    updateGitToken,
    deleteGitToken,
  };
}