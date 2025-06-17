export interface GitToken {
  id: string;
  label: string;
  token: string;
  masked_token: string,
  git_hosting: 'github' | 'gitlab';
  created_at: string;
  updated_at?: string;
}

export interface GitTokenListResponse {
  data: {
    tokens: GitToken[];
    total: number;
    limit: number;
    offset: number;
  };
}

export interface CreateGitTokenRequest {
  label: string;
  token_value: string;
  git_hosting: 'github' | 'gitlab';
}
