import React from 'react';
import { GitBranch, Star, PlayCircle , ExternalLink} from 'lucide-react';
import { useRepositories } from '../../hooks/useRepositories';

// Utility functions for date formatting
function formatDate(dateString: string | null): string {
  if (!dateString) return 'N/A';

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

function formatRelativeDate(dateString: string | null): string {
  if (!dateString) return 'N/A';

  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }

    return formatDate(dateString);
  } catch {
    return 'Invalid date';
  }
}

export function RepositoryList() {
  const { repositories, loading, error, analyzeRepository } = useRepositories();

  const handleAnalyze = async (repositoryId: string) => {
    await analyzeRepository(repositoryId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-500">Loading repositories...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="text-red-700">Error: {error}</div>
      </div>
    );
  }

  if (repositories.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">No repositories found</div>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {repositories.map((repo) => (
        <div
          key={repo.id}
          className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:border-cyan-400 transition-colors"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {repo.repo_name}
                </h3>
                {repo.html_url && (
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              {repo.description && (
                <p className="text-gray-600 mb-4">{repo.description}</p>
              )}

              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div>Added: {formatDate(repo.repo_created_at)}</div>
                {repo.repo_updated_at && (
                  <div>Last analyzed: {formatRelativeDate(repo.repo_updated_at)}</div>
                )}
              </div>
            </div>

            <button
              onClick={() => handleAnalyze(repo.id)}
              className={`shrink-0 flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                repo.repo_updated_at
                  ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                  : 'bg-cyan-500/10 hover:bg-cyan-500 hover:text-white text-cyan-500'
              }`}
            >
              <PlayCircle className="w-5 h-5" />
              <span>{repo.repo_updated_at ? 'Re-analyze' : 'Analyze'}</span>
            </button>
          </div>

          <div className="flex space-x-6 text-gray-500">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>{repo.stargazers_count.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <GitBranch className="w-4 h-4" />
              <span>{repo.branches}</span>
            </div>
            {/*<div className="flex items-center space-x-2">*/}
            {/*  <GitCommit className="w-4 h-4" />*/}
            {/*  <span>{repo.commits.toLocaleString()}</span>*/}
            {/*</div>*/}
          </div>
        </div>
      ))}
    </div>
  );
}