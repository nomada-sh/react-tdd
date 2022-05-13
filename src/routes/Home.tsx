import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Link to="/sign-in">Sign In</Link>
      <Link to="/github-repos">GitHub Repos</Link>
    </div>
  );
}
