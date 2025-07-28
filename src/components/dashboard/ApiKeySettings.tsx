import React, { useState } from 'react';
import { Plus, AlertCircle, Loader2 } from 'lucide-react';
import { useApiKeys } from '../../hooks/useApiKeys';


interface AddApiKeyModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSave: () => Promise<void>;
  readonly loading: boolean;
}

function AddApiKeyModal({ isOpen, onClose, onSave, loading }: Readonly<AddApiKeyModalProps>) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSave();
      onClose();
    } catch (error) {
      // Error handling is done in the parent component
      console.error('Failed to create API key:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New API Key</h2>
        <p className="text-sm text-gray-600 mb-6">
          This will generate a new API key for your account. Make sure to copy it immediately as it won't be shown again.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>Generate Key</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface NewKeyModalProps {
  readonly isOpen: boolean;
  readonly apiKey: string;
  readonly onClose: () => void;
}

function NewKeyModal({ isOpen, apiKey, onClose }: Readonly<NewKeyModalProps>) {
  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 p-4 rounded-lg mb-6">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm">
            Make sure to copy your API key now. You won't be able to see it again!
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm mb-6 break-all">
          {apiKey}
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Copy
          </button>
          <button
            onClick={onClose}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export function ApiKeySettings() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isNewKeyModalOpen, setIsNewKeyModalOpen] = useState(false);
  const [newApiKey, setNewApiKey] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  
  const { 
    apiKeys, 
    loading, 
    error, 
    createApiKey, 
    deleteApiKey, 
    maskToken 
  } = useApiKeys();

  const handleAddKey = async () => {
    try {
      setIsCreating(true);
      const createdKey = await createApiKey();
      setNewApiKey(createdKey.api_key);
      setIsNewKeyModalOpen(true);
    } catch (error) {
      console.error('Failed to create API key:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleRevoke = async (keyId: string) => {
    try {
      await deleteApiKey(keyId);
    } catch (error) {
      console.error('Failed to delete API key:', error);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">API Keys</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          disabled={loading || isCreating}
          className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          <span>Add API Key</span>
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2 text-red-700">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
          <span className="ml-2 text-gray-500">Loading API keys...</span>
        </div>
      ) : (
        <div className="grid gap-6">
          {apiKeys.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-lg font-medium mb-2">No API keys found</div>
              <div className="text-sm">Create your first API key to get started</div>
            </div>
          ) : (
            apiKeys.map((key) => (
              <div
                key={key.id}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="font-mono text-sm bg-gray-50 px-3 py-1 rounded-lg mb-2">
                      {key.masked_api_key || maskToken(key.api_key)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Created on {new Date(key.created_at).toLocaleDateString()}
                      {key.last_used_at && ` • Last used on ${new Date(key.last_used_at).toLocaleDateString()}`}
                    </div>
                  </div>
                  <button
                    onClick={() => handleRevoke(key.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Revoke
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <AddApiKeyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddKey}
        loading={isCreating}
      />

      <NewKeyModal
        isOpen={isNewKeyModalOpen}
        apiKey={newApiKey}
        onClose={() => setIsNewKeyModalOpen(false)}
      />
    </div>
  );
}