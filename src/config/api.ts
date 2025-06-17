export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  ENDPOINTS: {
    REPOSITORIES: '/api/v1/repos',
    ANALYZE_REPO: '/api/v1/repos/analyze',
    GIT_TOKENS: '/api/v1/git_tokens',
  },
  DEFAULT_PARAMS: {
    LIMIT: 20,
    OFFSET: 0,
  },
} as const;