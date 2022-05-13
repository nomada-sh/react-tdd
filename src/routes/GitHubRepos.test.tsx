/* eslint-disable testing-library/no-render-in-setup */
import { GitHubRepo, GitHubRepos } from './GitHubRepos';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const clickSearchButton = () => {
  const searchButton = screen.getByRole('button', { name: 'Search' });
  fireEvent.click(searchButton);
};

const clickNextPageButton = () => {
  const nextPageButton = screen.getByRole('button', { name: 'Next' });
  fireEvent.click(nextPageButton);
};

const clickPreviousPageButton = () => {
  const previousPageButton = screen.getByRole('button', {
    name: 'Previous',
  });
  fireEvent.click(previousPageButton);
};

const changeQuery = (query: string) => {
  const searchInput = screen.getByPlaceholderText('Search GitHub repositories');
  fireEvent.change(searchInput, { target: { value: query } });
};

const expectRepo = (repo: GitHubRepo) => {
  expect(
    screen.getByRole('columnheader', { name: 'Name' })
  ).toBeInTheDocument();
  expect(screen.getByRole('cell', { name: repo.name })).toBeInTheDocument();

  expect(
    screen.getByRole('columnheader', { name: 'Description' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('cell', { name: repo.description })
  ).toBeInTheDocument();

  expect(
    screen.getByRole('columnheader', { name: 'Owner' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('cell', { name: repo.owner.login })
  ).toBeInTheDocument();

  expect(
    screen.getByRole('columnheader', { name: 'Stars' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('cell', { name: repo.stargazers_count.toString() })
  ).toBeInTheDocument();

  expect(
    screen.getByRole('columnheader', { name: 'Forks' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('cell', { name: repo.forks_count.toString() })
  ).toBeInTheDocument();
};

const fakeRepo: GitHubRepo = {
  id: 1,
  name: 'Fake Repo',
  description: 'Fake Repo Description',
  owner: {
    login: 'Fake Owner',
  },
  stargazers_count: 420,
  forks_count: 69,
};

const nextFakeRepo: GitHubRepo = {
  id: 2,
  name: 'Next Fake Repo',
  description: 'Next Fake Repo Description',
  owner: {
    login: 'Next Fake Owner',
  },
  stargazers_count: 666,
  forks_count: 333,
};

const server = setupServer(
  rest.get('https://api.github.com/search/repositories', (req, res, ctx) => {
    const query = req.url.searchParams.get('q');
    if (query === 'error') return res(ctx.status(403));

    let page: any = req.url.searchParams.get('page');
    page = page ? parseInt(page, 10) : 1;

    return res(
      ctx.json<{
        total_count: number;
        items: GitHubRepo[];
      }>({
        total_count: 1,
        items: page > 1 ? [nextFakeRepo] : [fakeRepo],
      })
    );
  })
);

beforeAll(() => server.listen());

beforeEach(() => {
  server.resetHandlers();
  render(<GitHubRepos />);
});

afterAll(() => server.close());

describe('When component is mounted', () => {
  it('should render search input', () => {
    expect(
      screen.getByPlaceholderText('Search GitHub repositories')
    ).toBeInTheDocument();
  });

  it('should render a search button', () => {
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('should render an no results message', () => {
    expect(screen.getByText('No results.')).toBeInTheDocument();
  });

  it('should not render next and previous buttons', () => {
    expect(
      screen.queryByRole('button', { name: 'Next' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Previous' })
    ).not.toBeInTheDocument();
  });
});

describe('When query is entered and search button is clicked', () => {
  it('should render loading message', () => {
    changeQuery('test');
    clickSearchButton();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render next and previous buttons', async () => {
    changeQuery('test');
    clickSearchButton();

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Previous' })
    ).toBeInTheDocument();
  });

  it('should render results', async () => {
    changeQuery('test');
    clickSearchButton();

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    expectRepo(fakeRepo);
  });

  it('should render and error message when request fails', async () => {
    changeQuery('error');
    clickSearchButton();

    await waitFor(() => {
      expect(screen.getByText('An error occurred.')).toBeInTheDocument();
    });
  });

  it('should render next page when next button is clicked', async () => {
    changeQuery('test');
    clickSearchButton();

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    clickNextPageButton();

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    expectRepo(nextFakeRepo);

    clickPreviousPageButton();

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    expectRepo(fakeRepo);
  });
});
