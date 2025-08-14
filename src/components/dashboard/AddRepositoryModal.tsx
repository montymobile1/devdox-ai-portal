import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import { useGitTokens } from '../../hooks/useGitTokens';
import { repositoryService } from '../../services/repositoryService';

interface GitRepository {
  id: string;
  repo_name: string;
  full_name: string;
  description?: string;
  private: boolean;
  html_url: string;
}

interface AddRepositoryModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onRepositoryAdded?: () => void;
  readonly showSuccess: (message: string, title?: string) => string;
  readonly showError: (message: string, title?: string) => string;
}

export function AddRepositoryModal({ 
  isOpen, 
  onClose, 
  onRepositoryAdded, 
  showSuccess, 
  showError 
}: AddRepositoryModalProps) {
  const { gitTokens, loading: tokensLoading, error: tokensError } = useGitTokens();
  const { userId, getToken } = useAuth();
  const [selectedToken, setSelectedToken] = useState('');
  const [gitRepositories, setGitRepositories] = useState<GitRepository[]>([]);
  const [selectedRepo, setSelectedRepo] = useState('');
  const [repoAliasName, setRepoAliasName] = useState('');
  const [repoUserReference, setRepoUserReference] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [repoError, setRepoError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchGitRepositories = async (tokenId: string) => {
    if (!tokenId || !userId) {
      return;
    }

    setIsLoading(true);
    setRepoError(null);

    try {
      const authToken = await getToken();

      if (!authToken) {
        throw new Error('Authentication token not available');
      }

      const gitRepos = await repositoryService.getRepositoriesByTokenId(authToken, tokenId);
      const mappedRepos: GitRepository[] = Array.isArray(gitRepos)
        ? gitRepos.map((repo: any) => ({
            // Map Repository properties to GitRepository properties
            repo_name: repo.repo_name,
            private: repo.private,
            // Add other required GitRepository properties as needed
            ...repo
          }))
        : [];
      setGitRepositories(mappedRepos);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return;
      if (error instanceof Error) {
        if (error.name === 'AbortError') return;
        setRepoError(error.message);
      } else {
        setRepoError('Failed to fetch repositories');
      }
      console.error('Repository fetch error:', error);
      setGitRepositories([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTokenChange = async (tokenId: string) => {
    setSelectedToken(tokenId);
    setSelectedRepo('');
    setRepoAliasName('');
    setRepoUserReference('');
    setGitRepositories([]);

    if (tokenId) {
      await fetchGitRepositories(tokenId);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRepo || !selectedToken || !repoAliasName.trim()) {
      if (!repoAliasName.trim()) {
        showError('Repository alias name is required', 'Validation Error');
      }
      return;
    }

    setIsSubmitting(true);
    setRepoError(null);

    try {
      const authToken = await getToken();

      if (!authToken) {
        throw new Error('Authentication token not available');
      }

      const selectedRepository = gitRepositories.find(repo => repo.repo_name === selectedRepo);

      if (!selectedRepository) {
        throw new Error('Selected repository not found');
      }

      // Add repository using repositoryService with relative_path payload
      const response = await repositoryService.addRepository(authToken, selectedToken, {
        relative_path: selectedRepository.relative_path || selectedRepository.repo_name,
        repo_alias_name: repoAliasName.trim(),
        repo_user_reference: repoUserReference.trim()
      });

      // Show success notification with API response message
      showSuccess(
        response.message || 'Repository added successfully!',
        'Repository Added'
      );

      // Call the callback to refresh parent component
      onRepositoryAdded?.();

      // Close modal and reset form
      onClose();
      setSelectedToken('');
      setSelectedRepo('');
      setRepoAliasName('');
      setRepoUserReference('');
      setGitRepositories([]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add repository';
      
      // Show error notification
      showError(
        errorMessage,
        'Error Adding Repository'
      );
      
      console.error('Repository creation error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Extract repository selection rendering logic
  const renderRepositorySelection = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-4">
          <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }

    if (gitRepositories.length === 0 && selectedToken) {
      return (
        <div className="text-center py-4">
          <p className="text-sm text-gray-500">No repositories found</p>
        </div>
      );
    }

    return (
      <select
        id="repository"
        value={selectedRepo}
        onChange={(e) => setSelectedRepo(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        required
        disabled={isSubmitting}
      >
        <option key="default-repo" value="">Select a repository</option>
        {gitRepositories.map((repo) => (
          <option key={repo.repo_name} value={repo.repo_name}>
            {repo.repo_name} {repo.private ? '(Private)' : '(Public)'}
          </option>
        ))}
      </select>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Add Repository</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {(tokensError || repoError) && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">
              {tokensError && `Error loading tokens: ${tokensError}`}
              {tokensError && repoError && ' | '}
              {repoError && `Error loading repositories: ${repoError}`}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="git-token"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Git Token
              </label>
              {tokensLoading ? (
                <div className="flex items-center justify-center py-4">
                  <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <select
                  id="git-token"
                  value={selectedToken}
                  onChange={(e) => handleTokenChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  required
                  disabled={gitTokens.length === 0 || isSubmitting}
                >
                  <option key="default" value="">
                    {gitTokens.length === 0 ? 'No tokens available' : 'Select a token'}
                  </option>
                  {gitTokens.map((token) => (
                    <option key={token.id} value={token.id}>
                      {token.label} ({token.git_hosting})
                    </option>
                  ))}
                </select>
              )}
              {gitTokens.length === 0 && !tokensLoading && (
                <p className="text-sm text-gray-500 mt-1">
                  No git tokens found. Please add a token first.
                </p>
              )}
            </div>

            {selectedToken && (
              <div>
                <label
                  htmlFor="repository"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Repository
                </label>
                {renderRepositorySelection()}
              </div>
            )}

            {selectedRepo && (
              <>
                <div>
                  <label
                    htmlFor="repo-alias-name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Repository Alias Name *
                  </label>
                  <input
                    id="repo-alias-name"
                    type="text"
                    value={repoAliasName}
                    onChange={(e) => setRepoAliasName(e.target.value)}
                    placeholder="Enter a friendly name for this repository"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label
                    htmlFor="repo-user-reference"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    User Reference (Optional)
                  </label>
                  <textarea
                    id="repo-user-reference"
                    value={repoUserReference}
                    onChange={(e) => setRepoUserReference(e.target.value)}
                    placeholder="Enter any additional reference information"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                    disabled={isSubmitting}
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedToken || !selectedRepo || !repoAliasName.trim() || tokensLoading || isSubmitting}
              className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              {isSubmitting && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              <span>{isSubmitting ? 'Adding...' : 'Add Repository'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
