import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomeUser from './pages/user/Home';
import HomeAdmin from './pages/admin/HomeAdmin';
import MovieDetail from './pages/user/movie/MovieDetail';
import ViewMovie from './pages/user/movie/ViewMovie';
import MovieDetailAdmin from './components/admin/movie/detail-movie/MovieDetailAdmin';
import MovieType from './pages/user/movie/MovieType';
import MovieCategory from './pages/user/movie/MovieCategory';
import MovieYear from './pages/user/movie/MovieYear';
import MovieCountry from './pages/user/movie/MovieCountry';
import MovieSearch from './pages/user/movie/MovieSearch';

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
        <Route path="/movie/type/:typeSlug" element={<MovieType />} />
        <Route path="/movie/category/:catSlug" element={<MovieCategory />} />
        <Route path="/movie/country/:ctrSlug" element={<MovieCountry />} />
        <Route path="/movie/year/:year" element={<MovieYear />} />
        <Route path="/movie/search" element={<MovieSearch />} />

        <Route path="/movie/detail/:slug" element={<MovieDetail />} />
        <Route path="/movie/view/:slug/ep/:epId" element={<ViewMovie />} />
      </Routes>
    </Router>
  );
}

export default App;
