import React, { useState } from 'react';
import { Eye, EyeOff, Plus } from 'lucide-react';

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

interface AddTokenModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSave: (token: Omit<GitToken, 'createdAt'>) => void;
}

function AddTokenModal({ isOpen, onClose, onSave }: Readonly<AddTokenModalProps>) {
  const [showToken, setShowToken] = useState(false);
  const [label, setLabel] = useState('');
  const [token, setToken] = useState('');
  const [provider, setProvider] = useState<'github' | 'gitlab'>('github');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ label, token, provider });
    setLabel('');
    setToken('');
    setProvider('github');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Add New Token</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Label
              </label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="e.g., Personal GitHub Token"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Provider
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="github"
                    checked={provider === 'github'}
                    onChange={(e) => setProvider(e.target.value as 'github' | 'gitlab')}
                    className="text-cyan-500 focus:ring-cyan-500"
                  />
                  <span>GitHub</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="gitlab"
                    checked={provider === 'gitlab'}
                    onChange={(e) => setProvider(e.target.value as 'github' | 'gitlab')}
                    className="text-cyan-500 focus:ring-cyan-500"
                  />
                  <span>GitLab</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Token
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type={showToken ? 'text' : 'password'}
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Enter your token"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  {showToken ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Add Token
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export function GitTokenSettings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tokens, setTokens] = useState<GitToken[]>(mockTokens);

  const handleAddToken = (newToken: Omit<GitToken, 'createdAt'>) => {
    const tokenWithDate = {
      ...newToken,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setTokens([...tokens, tokenWithDate]);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Git Tokens</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Token</span>
        </button>
      </div>

      <div className="grid gap-6">
        {tokens.map((token, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:border-cyan-400 transition-colors"
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {token.label}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="capitalize">{token.provider}</span>
                <span>•</span>
                <span>Added on {token.createdAt}</span>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-2 rounded-lg font-mono text-sm">
              {token.token.slice(0, 4)}...{token.token.slice(-4)}
            </div>
          </div>
        ))}
      </div>

      <AddTokenModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddToken}
      />
    </div>
  );
}