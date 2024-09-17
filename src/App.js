import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import HomeUser from './pages/user/Home';
import HomeAdmin from './pages/admin/HomeAdmin';
import Movie from './pages/admin/Movie';
import MovieDetail from './pages/movie/MovieDetail';
import ViewMovie from './pages/movie/ViewMovie';

function App() {
  return (
    <Router>
      {/* admin router */}
      <Routes>
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/admin/movie" element={<Movie />} />
      </Routes>

      {/* user router */}
      <Routes>
        <Route path="/" element={<HomeUser />} />
      </Routes>

      {/* user router */}
      <Routes>
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/movie/:id/ep/:epId" element={<ViewMovie />} />
      </Routes>
    </Router>
  );
}

export default App;
