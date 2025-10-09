export interface Repository {
  id: string;
  repo_name: string;
  repo_alias_name: string
  description: string;
  html_url: string;
  stargazers_count: number;
  branches: number;
  commits: number;
  status: string;
  addedAt: string;
  repo_created_at: string | null;
  repo_updated_at: string | null;
}

export interface RepositoryListResponse {
  data: {
    repos: Repository[];
    total: number;
    limit: number;
    offset: number;
  };
}