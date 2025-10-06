import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { apiKeyService } from '../services/apiKeyService';
import { ApiKey } from '../types/apiKey';

export function useApiKeys() {
  const { getToken } = useAuth();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Prevent state updates on unmounted component
  const isMountedRef = useRef(true);

  const fetchApiKeys = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = await getToken();

      if (!token) {
        throw new Error('Authentication token not available');
      }

      const keys = await apiKeyService.getApiKeys(token);

      // Only update state if component is still mounted
      if (isMountedRef.current) {
        // Defensive check: ensure keys is an array
        setApiKeys(Array.isArray(keys) ? keys : []);
      }
    } catch (err) {
      if (isMountedRef.current) {
        const errorMessage = err instanceof Error ? err.message : 'Unexpected error occurred';
        setError(errorMessage);
        console.error('API keys fetch error:', err);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [getToken]);

  function maskToken(token: string): string {
    if (!token || typeof token !== 'string') return '****';
    if (token.length <= 8) return token;
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

      if (isMountedRef.current && newApiKey) {
        setApiKeys(prev => [...prev, newApiKey]);
      }

      return newApiKey;
    } catch (err) {
      if (isMountedRef.current) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to create API key';
        setError(errorMessage);
        console.error('API key creation error:', err);
      }
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

      if (isMountedRef.current) {
        setApiKeys(prev => prev.filter(k => k.id !== apiKeyId));
      }
    } catch (err) {
      if (isMountedRef.current) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to delete API key';
        setError(errorMessage);
        console.error('API key deletion error:', err);
      }
      throw err;
    }
  }, [getToken]);

  useEffect(() => {
    isMountedRef.current = true;
    fetchApiKeys();

    // Cleanup: prevent state updates after unmount
    return () => {
      isMountedRef.current = false;
    };
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