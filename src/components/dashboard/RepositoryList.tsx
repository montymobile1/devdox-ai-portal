import React from 'react';
import { GitBranch, GitCommit, Star, PlayCircle } from 'lucide-react';

interface Repository {
  name: string;
  description: string;
  stars: number;
  branches: number;
  commits: number;
  addedAt: string;
  lastAnalyzedAt: string | null;
  lastAnalyzedCommit: string | null;
}

const mockRepositories: Repository[] = [
  {
    name: 'example-repo',
    description: 'An example repository to demonstrate the UI',
    stars: 42,
    branches: 3,
    commits: 156,
    addedAt: '2024-03-15',
    lastAnalyzedAt: '2024-03-18',
    lastAnalyzedCommit: '8f4d76a',
  },
  {
    name: 'new-project',
    description: 'A newly added repository that has not been analyzed yet',
    stars: 12,
    branches: 2,
    commits: 45,
    addedAt: '2024-03-19',
    lastAnalyzedAt: null,
    lastAnalyzedCommit: null,
  },
];

export function RepositoryList() {
  const handleAnalyze = (repoName: string) => {
    console.log('Analyzing repository:', repoName);
  };

  return (
    <div className="grid gap-6">
      {mockRepositories.map((repo) => (
        <div
          key={repo.name}
          className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:border-cyan-400 transition-colors"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {repo.name}
              </h3>
              <p className="text-gray-600 mb-4">{repo.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div>Added: {repo.addedAt}</div>
                {repo.lastAnalyzedAt && (
                  <>
                    <div>Last analyzed: {repo.lastAnalyzedAt}</div>
                    <div className="flex items-center space-x-1">
                      <GitCommit className="w-4 h-4" />
                      <span>{repo.lastAnalyzedCommit}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            <button
              onClick={() => handleAnalyze(repo.name)}
              className={`shrink-0 flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                repo.lastAnalyzedAt
                  ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                  : 'bg-cyan-500/10 hover:bg-cyan-500 hover:text-white text-cyan-500'
              }`}
            >
              <PlayCircle className="w-5 h-5" />
              <span>{repo.lastAnalyzedAt ? 'Re-analyze' : 'Analyze'}</span>
            </button>
          </div>
          <div className="flex space-x-6 text-gray-500">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>{repo.stars}</span>
            </div>
            <div className="flex items-center space-x-2">
              <GitBranch className="w-4 h-4" />
              <span>{repo.branches}</span>
            </div>
            <div className="flex items-center space-x-2">
              <GitCommit className="w-4 h-4" />
              <span>{repo.commits}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}