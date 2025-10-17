import React, { useState } from 'react';
import { Check, Copy, GitBranch, Key, Mail, FileCode, Monitor, Apple, Terminal } from 'lucide-react';

export function GettingStartedGuide() {
  const [copiedStep, setCopiedStep] = useState<string | number | null>(null);
  const [activeTab, setActiveTab] = useState<'cursor' | 'claude' | 'vscode'>('cursor');
  const [selectedOS, setSelectedOS] = useState<'macos' | 'windows' | 'linux'>('macos');

  const copyToClipboard = (text: string, stepNumber: string | number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepNumber);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const claudeConfig = `{
  "devdox": {
    "command": "npx",
    "args": [
      "-y",
      "mcp-remote",
      "https://agent.devdox.ai/mcp",
      "--header",
      "API-KEY: YOUR_API_KEY_HERE"
    ]
  }
}`;

  const cursorConfig = `{
  "mcpServers": {
    "devdox": {
      "url": "https://agent.devdox.ai/mcp",
      "headers": {
        "API-KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}`;

  const vscodeConfig = `{
  "servers": {
    "devdox": {
      "url": "https://agent.devdox.ai/mcp",
      "type": "http",
      "headers": {
        "API-KEY": "YOUR_API_KEY_HERE"
      }
    }
  },
  "inputs": []
}`;

  const configurations = {
    cursor: {
      name: 'Cursor',
      icon: '⚡',
      description: 'Configure Cursor IDE with DevDox MCP for intelligent code assistance',
      config: cursorConfig,
      paths: {
        macos: '~/.cursor/mcp.json',
        windows: '%USERPROFILE%\\.cursor\\mcp.json',
        linux: '~/.cursor/mcp.json'
      },
      instructions: {
        macos: [
          'Open Terminal',
          'Create directory: mkdir -p ~/.cursor',
          'Edit file: nano ~/.cursor/mcp.json',
          'Paste the configuration above',
          'Save (Ctrl+O, Enter) and exit (Ctrl+X)',
          'Restart Cursor IDE'
        ],
        windows: [
          'Open PowerShell or Command Prompt',
          'Create directory: mkdir %USERPROFILE%\\.cursor',
          'Edit file: notepad %USERPROFILE%\\.cursor\\mcp.json',
          'Paste the configuration above',
          'Save (Ctrl+S) and close',
          'Restart Cursor IDE'
        ],
        linux: [
          'Open Terminal',
          'Create directory: mkdir -p ~/.cursor',
          'Edit file: nano ~/.cursor/mcp.json',
          'Paste the configuration above',
          'Save (Ctrl+O, Enter) and exit (Ctrl+X)',
          'Restart Cursor IDE'
        ]
      }
    },
    claude: {
      name: 'Claude Desktop',
      icon: '🤖',
      description: 'Configure Claude Desktop with DevDox for AI-powered code understanding',
      config: claudeConfig,
      paths: {
        macos: '~/Library/Application Support/Claude/claude_desktop_config.json',
        windows: '%APPDATA%\\Claude\\claude_desktop_config.json',
        linux: '~/.config/Claude/claude_desktop_config.json'
      },
      instructions: {
        macos: [
          'Open Terminal',
          'Create directory: mkdir -p ~/Library/Application\\ Support/Claude',
          'Edit file: nano ~/Library/Application\\ Support/Claude/claude_desktop_config.json',
          'Paste the configuration above',
          'Save (Ctrl+O, Enter) and exit (Ctrl+X)',
          'Restart Claude Desktop'
        ],
        windows: [
          'Open PowerShell or Command Prompt',
          'Create directory: mkdir %APPDATA%\\Claude',
          'Edit file: notepad %APPDATA%\\Claude\\claude_desktop_config.json',
          'Paste the configuration above',
          'Save (Ctrl+S) and close',
          'Restart Claude Desktop'
        ],
        linux: [
          'Open Terminal',
          'Create directory: mkdir -p ~/.config/Claude',
          'Edit file: nano ~/.config/Claude/claude_desktop_config.json',
          'Paste the configuration above',
          'Save (Ctrl+O, Enter) and exit (Ctrl+X)',
          'Restart Claude Desktop'
        ]
      }
    },
    vscode: {
      name: 'VS Code',
      icon: '💻',
      description: 'Configure VS Code with Cline extension for DevDox integration',
      config: vscodeConfig,
      paths: {
        macos: '~/.vscode/mcp.json',
        windows: '%USERPROFILE%\\.vscode\\mcp.json',
        linux: '~/.vscode/mcp.json'
      },
      instructions: {
        macos: [
          'Open Terminal',
          'Create directory: mkdir -p ~/.vscode',
          'Edit file: nano ~/.vscode/mcp.json',
          'Paste the configuration above',
          'Save (Ctrl+O, Enter) and exit (Ctrl+X)',
          'Reload VS Code window (Cmd+Shift+P → "Reload Window")'
        ],
        windows: [
          'Open PowerShell or Command Prompt',
          'Create directory: mkdir %USERPROFILE%\\.vscode',
          'Edit file: notepad %USERPROFILE%\\.vscode\\mcp.json',
          'Paste the configuration above',
          'Save (Ctrl+S) and close',
          'Reload VS Code window (Ctrl+Shift+P → "Reload Window")'
        ],
        linux: [
          'Open Terminal',
          'Create directory: mkdir -p ~/.vscode',
          'Edit file: nano ~/.vscode/mcp.json',
          'Paste the configuration above',
          'Save (Ctrl+O, Enter) and exit (Ctrl+X)',
          'Reload VS Code window (Ctrl+Shift+P → "Reload Window")'
        ]
      }
    }
  };

  const currentConfig = configurations[activeTab];
  const currentPath = currentConfig.paths[selectedOS];
  const currentInstructions = currentConfig.instructions[selectedOS];

  const osIcons = {
    macos: Apple,
    windows: Monitor,
    linux: Terminal
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">
            Getting Started with DevDox
          </h1>
          <p className="text-lg text-gray-400">
            Follow these simple steps to integrate DevDox AI with your IDE
          </p>
        </div>

        {/* Progress Steps */}
        <div className="space-y-8">
          {/* Step 1: Add Git Token */}
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-500/50 rounded-lg flex items-center justify-center">
                  <span className="text-cyan-400 font-bold text-lg">1</span>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-white mb-3 flex items-center">
                  <Key className="mr-2 text-cyan-400" size={24} />
                  Add GitHub/GitLab Token
                </h2>
                <p className="text-gray-400 mb-4 text-sm">
                  Connect your GitHub or GitLab account by adding a personal access token. This will be securely saved in DevDox.
                </p>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 space-y-3">
                  <div>
                    <p className="text-cyan-400 font-medium text-sm mb-2">For GitHub:</p>
                    <ol className="list-decimal list-inside space-y-1.5 text-gray-400 text-sm ml-2">
                      <li>Go to GitHub Settings → Developer Settings → Personal Access Tokens</li>
                      <li>Generate a new token with <code className="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-300">repo</code> scope</li>
                      <li>Navigate to DevDox → <strong className="text-white">Git Tokens</strong> page</li>
                      <li>Add your token with a label (e.g., "My GitHub Token")</li>
                    </ol>
                  </div>
                  <div className="border-t border-slate-700/50 pt-3">
                    <p className="text-purple-400 font-medium text-sm mb-2">For GitLab:</p>
                    <ol className="list-decimal list-inside space-y-1.5 text-gray-400 text-sm ml-2">
                      <li>Go to GitLab → Preferences → Access Tokens</li>
                      <li>Create a token with <code className="bg-slate-800 px-1.5 py-0.5 rounded text-purple-300">read_repository</code> scope</li>
                      <li>Navigate to DevDox → <strong className="text-white">Git Tokens</strong> page</li>
                      <li>Add your token with a label (e.g., "My GitLab Token")</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Add Repository */}
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-500/50 rounded-lg flex items-center justify-center">
                  <span className="text-cyan-400 font-bold text-lg">2</span>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-white mb-3 flex items-center">
                  <GitBranch className="mr-2 text-cyan-400" size={24} />
                  Add Your Repository
                </h2>
                <p className="text-gray-400 mb-4 text-sm">
                  Select a saved Git token and choose the repository you want to clone and analyze.
                </p>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                  <ol className="list-decimal list-inside space-y-2 text-gray-400 text-sm ml-2">
                    <li>Navigate to DevDox → <strong className="text-white">Repositories</strong> section</li>
                    <li>Click <span className="text-cyan-400 font-medium">"Add Repository"</span> button</li>
                    <li>Select your <strong className="text-white">Git Token</strong> from the saved tokens in DevDox</li>
                    <li>Choose the <strong className="text-white">repository</strong> you want to clone from the list</li>
                    <li>Click the <span className="text-cyan-400 font-medium">"Analyze"</span> button to start the analysis</li>
                  </ol>
                </div>
                <div className="mt-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
                  <p className="text-cyan-300 text-xs">
                    <strong>💡 Note:</strong> DevDox will clone your repository and begin indexing it for intelligent code assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Wait for Email */}
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-500/50 rounded-lg flex items-center justify-center">
                  <span className="text-cyan-400 font-bold text-lg">3</span>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-white mb-3 flex items-center">
                  <Mail className="mr-2 text-cyan-400" size={24} />
                  Wait for Analysis Complete Email
                </h2>
                <p className="text-gray-400 mb-4 text-sm">
                  DevDox will analyze your repository and send you an email notification once the analysis is complete. This usually takes a few minutes depending on the size of your codebase.
                </p>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                  <p className="text-gray-400 text-sm">
                    <strong className="text-yellow-400">⏱️ Tip:</strong> You'll receive an email at your registered address. Make sure to check your spam folder if you don't see it in your inbox.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Generate API Key */}
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-500/50 rounded-lg flex items-center justify-center">
                  <span className="text-cyan-400 font-bold text-lg">4</span>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-white mb-3 flex items-center">
                  <Key className="mr-2 text-cyan-400" size={24} />
                  Generate New API Key
                </h2>
                <p className="text-gray-400 mb-4 text-sm">
                  Once your repository analysis is complete, generate an API key to connect DevDox with your IDE.
                </p>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                  <ol className="list-decimal list-inside space-y-2 text-gray-400 text-sm ml-2">
                    <li>Go to DevDox → <strong className="text-white">API Keys</strong> section</li>
                    <li>Click <span className="text-cyan-400 font-medium">"Generate New API Key"</span></li>
                    <li>Copy the generated API key (you won't be able to see it again!)</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5: Configure IDE with Tabs */}
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-500/50 rounded-lg flex items-center justify-center">
                  <span className="text-cyan-400 font-bold text-lg">5</span>
                </div>
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-semibold text-white mb-3 flex items-center">
                  <FileCode className="mr-2 text-cyan-400" size={24} />
                  Configure Your IDE
                </h2>

                <p className="text-gray-400 mb-6 text-sm">
                  Choose your IDE and add the DevDox configuration to connect with your analyzed repository.
                </p>

                {/* IDE Tabs */}
                <div className="flex gap-2 mb-6 border-b border-slate-700/50 pb-px">
                  {(Object.keys(configurations) as Array<keyof typeof configurations>).map((ide) => {
                    const config = configurations[ide];
                    return (
                      <button
                        key={ide}
                        onClick={() => setActiveTab(ide)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-t-lg border-b-2 transition-all ${
                          activeTab === ide
                            ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400'
                            : 'border-transparent text-gray-400 hover:text-gray-300 hover:bg-slate-700/30'
                        }`}
                      >
                        <span className="text-lg">{config.icon}</span>
                        <span className="font-medium text-sm">{config.name}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-4">
                  {/* Description */}
                  <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/50">
                    <p className="text-gray-300 text-sm">{currentConfig.description}</p>
                  </div>

                  {/* OS Selector */}
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                    <h3 className="text-white font-medium text-sm mb-3">Select Your Operating System:</h3>
                    <div className="flex gap-2 flex-wrap">
                      {(Object.keys(osIcons) as Array<keyof typeof osIcons>).map((os) => {
                        const Icon = osIcons[os];
                        return (
                          <button
                            key={os}
                            onClick={() => setSelectedOS(os)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                              selectedOS === os
                                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                                : 'bg-slate-800 border-slate-700 text-gray-400 hover:border-slate-600'
                            }`}
                          >
                            <Icon size={18} />
                            <span className="text-sm font-medium capitalize">
                              {os === 'macos' ? 'macOS' : os === 'windows' ? 'Windows' : 'Linux'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* File Path */}
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-white font-medium text-sm">📁 Config File Location:</h3>
                      <button
                        onClick={() => copyToClipboard(currentPath, `${activeTab}-path`)}
                        className="text-gray-400 hover:text-cyan-400 transition-colors"
                        title="Copy path"
                      >
                        {copiedStep === `${activeTab}-path` ? (
                          <Check size={16} className="text-cyan-400" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    </div>
                    <code className="block bg-slate-800 px-3 py-2 rounded text-cyan-300 text-xs break-all">
                      {currentPath}
                    </code>
                  </div>

                  {/* Configuration Code */}
                  <div className="relative">
                    <div className="bg-slate-950 rounded-lg p-4 border border-slate-700/50 overflow-x-auto">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-medium text-sm">Configuration:</h3>
                        <button
                          onClick={() => copyToClipboard(currentConfig.config, `${activeTab}-config`)}
                          className="bg-slate-800 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-500/50 text-gray-400 hover:text-cyan-400 p-2 rounded-lg transition-all"
                          title="Copy configuration"
                        >
                          {copiedStep === `${activeTab}-config` ? (
                            <Check size={18} className="text-cyan-400" />
                          ) : (
                            <Copy size={18} />
                          )}
                        </button>
                      </div>
                      <pre className="text-gray-300 text-xs">
                        <code>{currentConfig.config}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Warning */}
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                    <p className="text-yellow-200 text-xs">
                      <strong>⚠️ Important:</strong> Replace{' '}
                      <code className="bg-yellow-900/50 px-1.5 py-0.5 rounded text-yellow-300">
                        YOUR_API_KEY_HERE
                      </code>{' '}
                      with your actual DevDox API key from step 4.
                    </p>
                  </div>

                  {/* Step-by-Step Instructions */}
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                    <h3 className="text-white font-medium text-sm mb-3">
                      📝 Setup Instructions:
                    </h3>
                    <ol className="space-y-2">
                      {currentInstructions.map((instruction, index) => (
                        <li key={index} className="text-gray-300 text-xs flex gap-2">
                          <span className="text-cyan-400 font-medium min-w-[20px]">
                            {index + 1}.
                          </span>
                          {instruction.startsWith('Create directory:') || instruction.startsWith('Edit file:') ? (
                            <div className="flex-1">
                              <span className="block mb-1">{instruction.split(':')[0]}:</span>
                              <code className="bg-slate-800 px-2 py-1 rounded text-cyan-300 block overflow-x-auto">
                                {instruction.split(':').slice(1).join(':').trim()}
                              </code>
                            </div>
                          ) : (
                            <span className="flex-1">{instruction}</span>
                          )}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Final Step */}
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <p className="text-green-200 text-xs">
                      <strong>✅ After saving:</strong> Restart {currentConfig.name} to apply the configuration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Final Step */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-cyan-500/5 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-cyan-500/20 border border-cyan-500/50 rounded-lg mb-3">
                <Check size={28} className="text-cyan-400" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-3">
                You're All Set! 🎉
              </h2>
              <p className="text-gray-400 mb-4 text-sm">
                Restart your IDE and you'll be able to use DevDox AI to get intelligent assistance with your codebase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}