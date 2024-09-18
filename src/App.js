import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomeUser from './pages/user/Home';
import HomeAdmin from './pages/admin/HomeAdmin';
import MovieDetail from './pages/user/movie/MovieDetail';
import ViewMovie from './pages/user/movie/ViewMovie';
import MovieDetailAdmin from './components/admin/movie/detail-movie/MovieDetailAdmin';

function App() {
  return (
    <Router>
      {/* admin router */}
      <Routes>
        <Route path="/admin/movie" element={<HomeAdmin />} />
        <Route path="/admin/movie-detail/:slug" element={<MovieDetailAdmin />} />
      </Routes>

      {/* user router */}
      <Routes>
        <Route path="/" element={<HomeUser />} />
      </Routes>

      {/* user router */}
      <Routes>
        <Route path="/movie/:slug" element={<MovieDetail />} />
        <Route path="/movie/:slug/ep/:epId" element={<ViewMovie />} />
      </Routes>
    </Router>
  );
}

export default App;
