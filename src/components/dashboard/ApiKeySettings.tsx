import React, { useState } from 'react';
import { Plus, AlertCircle } from 'lucide-react';

interface ApiKey {
  id: string;
  createdAt: string;
  lastUsed: string | null;
}

const mockApiKeys: ApiKey[] = [
  {
    id: 'key_1',
    createdAt: '2024-03-15',
    lastUsed: '2024-03-20',
  },
  {
    id: 'key_2',
    createdAt: '2024-03-18',
    lastUsed: null,
  },
];

interface AddApiKeyModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSave: (newKey: string) => void;
}

function generateSecureKey(length: number = 32): string {
  // Create a typed array of the required length
  const randomBytes = new Uint8Array(length);
  // Fill it with cryptographically secure random values
  crypto.getRandomValues(randomBytes);
  // Convert to base64 and remove non-alphanumeric characters
  const base64 = btoa(String.fromCharCode(...randomBytes))
    .replace(/[+/]/g, '') // Remove + and /
    .substring(0, length); // Ensure exact length
  return `sk_test_${base64}`;
}

function AddApiKeyModal({ isOpen, onClose, onSave }: Readonly<AddApiKeyModalProps>) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newKey = generateSecureKey();
    onSave(newKey);
    onClose();
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
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Generate Key
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
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(mockApiKeys);

  const handleAddKey = (key: string) => {
    const newKey: ApiKey = {
      id: `key_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: null,
    };
    setApiKeys([...apiKeys, newKey]);
    setNewApiKey(key);
    setIsNewKeyModalOpen(true);
  };

  const handleRevoke = (keyId: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== keyId));
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">API Keys</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add API Key</span>
        </button>
      </div>

      <div className="grid gap-6">
        {apiKeys.map((key) => (
          <div
            key={key.id}
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="font-mono text-sm bg-gray-50 px-3 py-1 rounded-lg mb-2">
                  •••• •••• •••• {key.id.slice(-4)}
                </div>
                <div className="text-sm text-gray-500">
                  Created on {key.createdAt}
                  {key.lastUsed && ` • Last used on ${key.lastUsed}`}
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
        ))}
      </div>

      <AddApiKeyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddKey}
      />

      <NewKeyModal
        isOpen={isNewKeyModalOpen}
        apiKey={newApiKey}
        onClose={() => setIsNewKeyModalOpen(false)}
      />
    </div>
  );
}