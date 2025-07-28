import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { apiKeyService } from '../services/apiKeyService';
import { ApiKey } from '../types/apiKey';

export function useApiKeys() {
  const { getToken } = useAuth();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApiKeys = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = await getToken();

      if (!token) {
        throw new Error('Authentication token not available');
      }

      const keys = await apiKeyService.getApiKeys(token);
      setApiKeys(keys);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unexpected error occurred';
      setError(errorMessage);
      console.error('API keys fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  function maskToken(token: string): string {
    if (token.length <= 8) return token; // fallback for short tokens
    const start = token.slice(0, 4);
    const end = token.slice(-4);
    const masked = '*'.repeat(token.length - 8);
    return `${start}${masked}${end}`;
  }

  const createApiKey = useCallback(async () => {
    try {
      const token = await getToken();

      if (!token) {
        throw new Error('Authentication token not available');
      }

      const newApiKey = await apiKeyService.createApiKey(token);
      setApiKeys(prev => [...prev, newApiKey]);

      return newApiKey;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create API key';
      setError(errorMessage);
      console.error('API key creation error:', err);
      throw err;
    }
  }, [getToken]);


  const deleteApiKey = useCallback(async (apiKeyId: string) => {
    try {
      const token = await getToken();

      if (!token) {
        throw new Error('Authentication token not available');
      }

      await apiKeyService.deleteApiKey(token, apiKeyId);
      setApiKeys(prev => prev.filter(k => k.id !== apiKeyId));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete API key';
      setError(errorMessage);
      console.error('API key deletion error:', err);
      throw err;
    }
  }, [getToken]);

  useEffect(() => {
    fetchApiKeys();
  }, [fetchApiKeys]);

  return {
    apiKeys,
    loading,
    error,
    fetchApiKeys,
    createApiKey,
    deleteApiKey,
    maskToken,
  };
}