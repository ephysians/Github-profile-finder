import React from 'react';
import { GitHubRepo } from "../types/github";

interface RepoListProps {
  repos: GitHubRepo[];
}

const RepoList: React.FC<RepoListProps> = ({ repos }) => (
  <div>
    <h2 className="text-xl font-bold mb-2">Repositories:</h2>
    <ul>
      {repos.map((repo) => (
        <li key={repo.name}>
          <a href={
            repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {repo.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default RepoList;
