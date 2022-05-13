import axios from 'axios';
import { useCallback, useRef, useState } from 'react';

const gh = axios.create({
  baseURL: 'https://api.github.com',
});

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

export function GitHubRepos() {
  const [query, setQuery] = useState('');
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const pageRef = useRef(1);

  const perPageRef = useRef(30);

  const hideNextPrevButtons = error || loading || repos.length === 0;

  const getRepos = useCallback(async () => {
    const q = query.trim();
    if (q.length === 0) {
      setError(null);
      setRepos([]);
      return;
    }

    setLoading(true);

    try {
      const { data } = await gh.get(
        `/search/repositories?q=${q}&page=${pageRef.current}&per_page=${perPageRef.current}`
      );
      setRepos(data.items);
      setError(null);
    } catch (e) {
      setError(e as Error);
    }

    setLoading(false);
  }, [query]);

  return (
    <div
      style={{
        width: 1000,
        height: '100vh',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        backgroundColor: '#ddd',
      }}
    >
      <div
        style={{
          marginBottom: 20,
          display: 'flex',
        }}
      >
        <input
          style={{
            flex: 1,
          }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search GitHub repositories"
        />
        <button
          onClick={() => {
            pageRef.current = 1;
            getRepos();
          }}
        >
          Search
        </button>
      </div>
      <div
        style={{
          flex: 1,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            overflow: 'auto',
          }}
        >
          {loading ? (
            <p>Loading...</p>
          ) : repos.length ? (
            <table
              style={{
                width: '100%',
              }}
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Owner</th>
                  <th>Stars</th>
                  <th>Forks</th>
                </tr>
              </thead>
              <tbody>
                {repos.map((repo) => {
                  return (
                    <tr key={repo.id}>
                      <td>{repo.name}</td>
                      <td>{repo.description}</td>
                      <td>{repo.owner.login}</td>
                      <td>{repo.stargazers_count}</td>
                      <td>{repo.forks_count}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : error ? (
            <p
              style={{
                color: 'red',
              }}
            >
              An error occurred.
            </p>
          ) : (
            <p>No results.</p>
          )}
        </div>
      </div>
      {hideNextPrevButtons ? null : (
        <div
          style={{
            marginTop: 20,
          }}
        >
          <button
            onClick={() => {
              pageRef.current =
                pageRef.current - 1 < 1 ? 1 : pageRef.current - 1;
              getRepos();
            }}
          >
            Previous
          </button>
          <button
            onClick={() => {
              pageRef.current = pageRef.current + 1;
              getRepos();
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
