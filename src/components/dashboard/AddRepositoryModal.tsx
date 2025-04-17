import React, { useState } from 'react';
import { X } from 'lucide-react';

interface GitToken {
  label: string;
  token: string;
  provider: 'github' | 'gitlab';
  createdAt: string;
}

const mockTokens: GitToken[] = [
  {
    label: 'Personal GitHub Token',
    token: 'ghp_1234567890abcdef1234567890abcdef123456',
    provider: 'github',
    createdAt: '2024-03-15',
  },
  {
    label: 'Work GitLab Token',
    token: 'glpat-1234567890abcdef1234567890abcdef123456',
    provider: 'gitlab',
    createdAt: '2024-03-14',
  },
];

interface AddRepositoryModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export function AddRepositoryModal({ isOpen, onClose }: AddRepositoryModalProps) {
  const [selectedToken, setSelectedToken] = useState('');
  const [url, setUrl] = useState('');
  const [repositories, setRepositories] = useState<string[]>([]);
  const [selectedRepo, setSelectedRepo] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTokenChange = async (tokenId: string) => {
    setSelectedToken(tokenId);
    setIsLoading(true);
    // Simulate API call to fetch repositories
    setTimeout(() => {
      setRepositories([
        'user/repo1',
        'user/repo2',
        'user/repo3',
        'organization/repo4',
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle repository addition here
    console.log('Selected Token:', selectedToken);
    console.log('Selected Repository:', selectedRepo);
    onClose();
    setSelectedToken('');
    setUrl('');
    setSelectedRepo('');
    setRepositories([]);
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
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="git-token"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Git Token
              </label>
              <select
                id="git-token"
                value={selectedToken}
                onChange={(e) => handleTokenChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                required
              >
                <option value="">Select a token</option>
                {mockTokens.map((token, index) => (
                  <option key={index} value={token.token}>
                    {token.label} ({token.provider})
                  </option>
                ))}
              </select>
            </div>

            {selectedToken && (
              <div>
                <label
                  htmlFor="repository"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Repository
                </label>
                {isLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <select
                    id="repository"
                    value={selectedRepo}
                    onChange={(e) => setSelectedRepo(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a repository</option>
                    {repositories.map((repo) => (
                      <option key={repo} value={repo}>
                        {repo}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedToken || !selectedRepo}
              className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
            >
              Add Repository
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}