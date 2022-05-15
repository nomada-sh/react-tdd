export type GitHubRepo = {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  owner: {
    login: string;
  };
};