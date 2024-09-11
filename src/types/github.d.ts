export interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
}

export interface GitHubRepo {
  name: string;
  html_url: string;
}
