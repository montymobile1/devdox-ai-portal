import React, { useState } from 'react';
import { Eye, EyeOff, Plus, Trash2, RefreshCw } from 'lucide-react';
import { useGitTokens } from '../../hooks/useGitTokens';
import { CreateGitTokenRequest } from '../../types/gitToken';

interface AddTokenModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSave: (token: CreateGitTokenRequest) => Promise<void>;
}

function AddTokenModal({ isOpen, onClose, onSave }: Readonly<AddTokenModalProps>) {
  const [showToken, setShowToken] = useState(false);
  const [label, setLabel] = useState('');
  const [saving, setSaving] = useState(false);
  const [token_value, setToken_value] = useState('');
  const [git_hosting, setGit_hosting] = useState<'github' | 'gitlab'>('github');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
       setSaving(true);
      await onSave({ label, token_value, git_hosting });

      setLabel('');
      setToken_value('');
      setGit_hosting('github');
      onClose();
    } catch (error) {
      // Error is handled by the parent component
       console.error(error);

    }
    finally {
       setSaving(false);//always reset, even on success (in case the modal stays open)
    }
  };

  const handleClose = () => {
    setLabel('');
    setToken_value('');
    setGit_hosting('github');
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
              <label htmlFor="token-label" className="block text-sm font-medium text-gray-700 mb-2">
                Label
              </label>
              <input
                id="token-label"
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="e.g., Personal GitHub Token"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                required
                disabled={saving}
              />
            </div>

            <div>
              <fieldset disabled={saving}>
                <legend className="block text-sm font-medium text-gray-700 mb-2">
                  Provider
                </legend>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="git_hosting"
                      value="github"
                      checked={git_hosting === 'github'}
                      onChange={(e) => setGit_hosting(e.target.value as 'github' | 'gitlab')}
                      className="text-cyan-500 focus:ring-cyan-500"
                    />
                    <span>GitHub</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="git_hosting"
                      value="gitlab"
                      checked={git_hosting === 'gitlab'}
                      onChange={(e) => setGit_hosting(e.target.value as 'github' | 'gitlab')}
                      className="text-cyan-500 focus:ring-cyan-500"
                    />
                    <span>GitLab</span>
                  </label>
                </div>
              </fieldset>
            </div>

            <div>
              <label htmlFor="token_value" className="block text-sm font-medium text-gray-700 mb-2">
                Token
              </label>
              <div className="flex items-center space-x-2">
                <input
                  id="token_value"
                  type={showToken ? 'text' : 'password'}
                  value={token_value}
                  onChange={(e) => setToken_value(e.target.value)}
                  placeholder="Enter your token"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                  aria-label={showToken ? 'Hide token' : 'Show token'}
                  disabled={saving}
                >
                  {showToken ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 disabled:opacity-50"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                disabled={saving}
              >
                {saving && <RefreshCw className="w-4 h-4 animate-spin" />}
                <span>{saving ? 'Adding...' : 'Add Token'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// Utility function for date formatting
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return 'Invalid date';
  }
}

export function GitTokenSettings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingTokenId, setDeletingTokenId] = useState<string | null>(null);


  const {
    gitTokens,
    loading,
    error,
    createGitToken,
    deleteGitToken,
  } = useGitTokens();

  const handleAddToken = async (newToken: CreateGitTokenRequest) => {
    await createGitToken(newToken);
  };

  const handleDeleteToken = async (tokenId: string) => {
    if (window.confirm('Are you sure you want to delete this token?')) {
      try {
        setDeletingTokenId(tokenId);
        await deleteGitToken(tokenId);
      } catch (error) {
        // Error is handled by the hook
        console.error(error);
      throw error;
      } finally {
        setDeletingTokenId(null);
      }
    }
  };


  if (loading) {
    return (
        <div className="mx-auto px-4 sm:px-6 py-8">
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-500">Loading git tokens...</div>
      </div>
        </div>
    );
  }

  return (
     <div className="mx-auto px-4 sm:px-6 py-8">
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

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="text-red-700">Error: {error}</div>
        </div>
      )}

      {gitTokens.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500">No git tokens found</div>
        </div>
      ) : (
        <div className="grid gap-6">
          {gitTokens.map((token) => (
            <div
              key={token.id}
              className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:border-cyan-400 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {token.label}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="capitalize">{token.git_hosting}</span>
                    <span>•</span>
                    <span>Added on {formatDate(token.created_at)}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">


                  <button
                    onClick={() => handleDeleteToken(token.id)}
                    disabled={deletingTokenId === token.id}
                    className="flex items-center space-x-1 px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deletingTokenId === token.id ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    <span>{deletingTokenId === token.id ? 'Deleting...' : 'Delete'}</span>
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-2 rounded-lg font-mono text-sm">
                {token.masked_token}
              </div>
            </div>
          ))}
        </div>
      )}

      <AddTokenModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddToken}
      />
    </div>
  );
}