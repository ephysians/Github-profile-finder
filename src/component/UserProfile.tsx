import React from 'react';

import { GitHubUser } from "../types/github"; 

interface UserProfileProps {
  user: GitHubUser;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => (
  <div className="border p-4 rounded-lg shadow-lg">
    <div className="flex items-center mb-4">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-24 h-24 rounded-full mr-4"
      />
      <div>
        <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-xl font-bold">{user.login}</a>
        <p>Followers: {user.followers}</p>
        <p>Following: {user.following}</p>
        <p>Public Repos: {user.public_repos}</p>
      </div>
    </div>
  </div>
);

export default UserProfile;
