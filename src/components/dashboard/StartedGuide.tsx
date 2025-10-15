import React, {useState} from 'react';
import { Check, Copy, GitBranch, Key, Mail, FileCode } from 'lucide-react';



export function GettingStartedGuide() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);
  const copyToClipboard = (text: string, stepNumber: number) => {
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


    return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">
            Getting Started with DevDox
          </h1>
          <p className="text-lg text-gray-400">
            Follow these simple steps to integrate DevDox AI with Claude Desktop
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
                  Once your repository analysis is complete, generate an API key to connect DevDox with Claude Desktop.
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

          {/* Step 5: Configure Claude Desktop */}
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
                  Configure Claude Desktop
                </h2>
                <p className="text-gray-400 mb-4 text-sm">
                  Add the DevDox configuration to your Claude Desktop config file (<code className="bg-slate-900 px-2 py-0.5 rounded text-cyan-300 text-xs">claude_desktop_config.json</code>).
                </p>

                <div className="space-y-3">
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                    <h3 className="text-white font-medium text-sm mb-2">📁 Config File Location:</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-400 text-xs ml-2">
                      <li><strong className="text-gray-300">macOS:</strong> <code className="bg-slate-800 px-1.5 py-0.5 rounded">~/Library/Application Support/Claude/claude_desktop_config.json</code></li>
                      <li><strong className="text-gray-300">Windows:</strong> <code className="bg-slate-800 px-1.5 py-0.5 rounded">%APPDATA%\Claude\claude_desktop_config.json</code></li>
                      <li><strong className="text-gray-300">Linux:</strong> <code className="bg-slate-800 px-1.5 py-0.5 rounded">~/.config/Claude/claude_desktop_config.json</code></li>
                    </ul>
                  </div>

                  <div className="relative">
                    <div className="bg-slate-950 rounded-lg p-4 border border-slate-700/50 overflow-x-auto">
                      <button
                        onClick={() => copyToClipboard(claudeConfig, 5)}
                        className="absolute top-2 right-2 bg-slate-800 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-500/50 text-gray-400 hover:text-cyan-400 p-2 rounded-lg transition-all"
                        title="Copy to clipboard"
                      >
                        {copiedStep === 5 ? (
                          <Check size={18} className="text-cyan-400" />
                        ) : (
                          <Copy size={18} />
                        )}
                      </button>
                      <pre className="text-gray-300 text-xs">
                        <code>{claudeConfig}</code>
                      </pre>
                    </div>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                    <p className="text-yellow-200 text-xs">
                      <strong>⚠️ Important:</strong> Replace <code className="bg-yellow-900/50 px-1.5 py-0.5 rounded text-yellow-300">YOUR_API_KEY_HERE</code> with your actual DevDox API key from step 4.
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
                Restart Claude Desktop and you'll be able to use DevDox AI to get intelligent assistance with your codebase.
              </p>
              {/*<div className="inline-block bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">*/}
              {/*  <p className="text-xs text-gray-400">*/}
              {/*    <strong className="text-cyan-400">💡 Pro Tip:</strong> Try asking Claude: "What does this repository do?" or "Explain the main components of my codebase"*/}
              {/*  </p>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}