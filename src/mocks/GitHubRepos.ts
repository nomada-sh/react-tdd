import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { GitHubRepo } from '../types';

export const fakeRepo: GitHubRepo = {
  id: 1,
  name: 'Fake Repo',
  description: 'Fake Repo Description',
  owner: {
    login: 'Fake Owner',
  },
  stargazers_count: 420,
  forks_count: 69,
};

export const nextFakeRepo: GitHubRepo = {
  id: 2,
  name: 'Next Fake Repo',
  description: 'Next Fake Repo Description',
  owner: {
    login: 'Next Fake Owner',
  },
  stargazers_count: 666,
  forks_count: 333,
};

export const fakeRepos: GitHubRepo[] = new Array(65).fill(0).map((_, i) => {
  return {
    id: i + 1,
    name: `Fake Repo ${i + 1}`,
    description: `Fake Repo Description ${i + 1}`,
    owner: {
      login: `Fake Owner ${i + 1}`,
    },
    stargazers_count: i + 1,
    forks_count: i + 1,
  };
});

export const server = setupServer(
  rest.get('https://api.github.com/search/repositories', (req, res, ctx) => {
    const query = req.url.searchParams.get('q');
    if (query === 'error') return res(ctx.status(403));

    let page: any = req.url.searchParams.get('page');
    page = page ? parseInt(page, 10) : 1;

    let perPage: any = req.url.searchParams.get('per_page');
    perPage = perPage ? parseInt(perPage, 10) : 30;

    let items: GitHubRepo[] = page > 1 ? [nextFakeRepo] : [fakeRepo];

    if (query === 'many')
      items = fakeRepos.slice((page - 1) * perPage, page * perPage);

    return res(
      ctx.json<{
        total_count: number;
        items: GitHubRepo[];
      }>({
        total_count: 1,
        items,
      })
    );
  })
);
