import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import UserMovieList from "./pages/UserMovieList/UserMovieList";
import MovieHome from "./pages/MovieHome/MovieHome";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import AddMovie from "./pages/AddMovie/AddMovie";
import "./App.scss";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MovieHome />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/movie-lists" element={<UserMovieList />} />
          <Route path="/list/new" element={<AddMovie />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
