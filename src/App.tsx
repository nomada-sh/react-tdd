import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignIn } from './routes/SignIn';
import { Home } from './routes/Home';
import { GitHubRepos } from './routes/GitHubRepos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/github-repos" element={<GitHubRepos />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
