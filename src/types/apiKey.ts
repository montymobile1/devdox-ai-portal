export interface ApiKey {
  id: string;
  api_key: string;
  masked_api_key: string;
  created_at: string;
  last_used_at?: string | null;
}

export interface ApiKeyListResponse {
  data:  ApiKey[];

}
